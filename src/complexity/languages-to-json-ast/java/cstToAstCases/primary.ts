import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';
import { MethodInvocationSuffix } from '../models/method-invocation-suffix.model';
import { clone } from 'genese-mapper';


export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);

    const methodInvocationSuffix = primarySuffixAst.filter(e => e.kind === 'MethodInvocationSuffix');
    const arrayAccessSuffix = primarySuffixAst.filter(e => e.kind === 'ArrayAccessSuffix');

    if (Array.isArray(methodInvocationSuffix) && methodInvocationSuffix.length > 1) {
        return handleMethodInvocationSuffix(cstNode, primaryPrefixAst, primarySuffixAst, methodInvocationSuffix);
    } else if(Array.isArray(arrayAccessSuffix) && arrayAccessSuffix.length > 1) {
        return createElementAccess(primaryPrefixAst, primarySuffixAst, arrayAccessSuffix, true);
    }
    return handleNoMethodInvocationSuffix(primaryPrefixAst, primarySuffixAst);
}

/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 */
function handleNoMethodInvocationSuffix(primaryPrefixAst: any, primarySuffixAst: any) {
    if (primaryPrefixAst.length <= 1) {
        return [
            ...primaryPrefixAst,
            ...primarySuffixAst
        ];
    }
    return [
        toPropertyAccessExpression(primaryPrefixAst, false, []),
        ...primarySuffixAst
    ];
}

/**
 * @param  {any} cstNode
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param  {any} methodInvocationSuffix
 */
function handleMethodInvocationSuffix(cstNode: any, primaryPrefixAst: any, primarySuffixAst: any, methodInvocationSuffix: any) {
    const identifierSuffix = primarySuffixAst.filter(e => e.kind === 'Identifier');
    const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');

    let obj = {
        kind: 'CallExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
    };

    if (thisKeyword) {
        return getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix, obj);
    }
    return getOtherCasesChildren(primaryPrefixAst, primarySuffixAst, methodInvocationSuffix, obj);
}

/**
 * @param  {any} methodInvocationSuffix
 * @param  {any} thisKeyword
 * @param  {any} identifierSuffix
 * @param  {any} obj
 * @returns any
 */
function getThisKeywordChildren(methodInvocationSuffix: any, thisKeyword: any, identifierSuffix: any, obj: any): any[] {
    return {
        ...obj,
        children: [
            toPropertyAccessExpression([
                thisKeyword,
                ...identifierSuffix,
            ], true, clone(methodInvocationSuffix)),
            ...getMethodInvocationSuffixChildren(methodInvocationSuffix),
        ]
    };
}


/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param  {any} obj
 * @returns any
 */
function getOtherCasesChildren(primaryPrefixAst: any, primarySuffixAst: any, methodInvocationSuffix: any, obj: any): any[] {

    return {
        ...obj,
        children: [
            toPropertyAccessExpression([
                ...getNewExpression(primaryPrefixAst),
                ...primaryPrefixAst.filter(e => e.kind === 'Identifier'),
                ...primarySuffixAst.filter(e => e.kind === 'Identifier')
            ], true, clone(methodInvocationSuffix)),
            ...primarySuffixAst.filter(e => e.kind === 'ClassLiteralSuffix'),
            ...getMethodInvocationSuffixChildren(methodInvocationSuffix),
        ]
    };
}
/** Get all MethodInvocationSuffix with children
 * @param  {} methodInvocationSuffixList
 */
function getMethodInvocationSuffixChildren(methodInvocationSuffixList) {
    let childrenList = [];
    if(Array.isArray(methodInvocationSuffixList)) {
        methodInvocationSuffixList.forEach(methodInvocationSuffix => {
            if(Array.isArray(methodInvocationSuffix.children) && methodInvocationSuffix.children.length > 0) {
                childrenList.push(...methodInvocationSuffix.children);
            }
        });
    }
    return childrenList;
}

/** Get newExpression Ast node
 * @param  {any} primaryPrefixAst
 * @returns any
 */
function getNewExpression(primaryPrefixAst: any): any[] {
    const newExpression = primaryPrefixAst.filter(e => e.kind === 'NewExpression');

    if (Array.isArray(newExpression) && newExpression.length) {
        return [
            ...primaryPrefixAst.find(e => e.kind === 'NewExpression').children
        ];
    }
    return [];
}

/**
 * @param  {} primaryPrefixAst
 * @param  {} arrayAccessSuffixList
 * @returns any
 */
function createElementAccess(primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList, first): any{
    if (arrayAccessSuffixList.length === 1) {
        return {
            kind: 'ElementAccessExpression',
            start: primaryPrefixAst[0]?.start,
            end: arrayAccessSuffixList[0]?.end,
            pos: arrayAccessSuffixList[0]?.pos,
            children: [
                primaryPrefixAst.find(e => e.kind === 'Identifier'),
                ...arrayAccessSuffixList[0].children.filter(e => e.kind === 'Identifier') 
            ]
        }
    } else {
        const arrayAccessSuffix = arrayAccessSuffixList.pop();
        const last = arrayAccessSuffix.children?.find(e => e.kind === 'Identifier');
        let start = 0, pos = 0;
        if (first) {
            start = primaryPrefixAst[0]?.start;
            pos = last.pos;
        } else {
            start = arrayAccessSuffix.start;
            pos = arrayAccessSuffix.pos;
        }
        return {
            kind: 'ElementAccessExpression',
            start: start,
            end: arrayAccessSuffix?.end,
            pos: pos,
            children: [{
                ...createElementAccess(primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList, false),
                },last
            ]
        };      
    }
}

/**
 * @param  {any[]} identifiers
 * @param  {} isFunctionCall=false
 * @param  {any[]} methodInvocationSuffix
 * @returns any
 */
function toPropertyAccessExpression(identifiers: any[], isFunctionCall = false, methodInvocationSuffix: any[]): any {
    if (!identifiers) return undefined;

    if (identifiers.length === 1 && methodInvocationSuffix.length === 0) {
        return identifiers[0];
    } else if (identifiers.length === 0) {
        return undefined;
    } else {
        const last = identifiers.pop();

        if (isFunctionCall) {
            methodInvocationSuffix.pop();

            let start = 0, pos = 0;
            if (identifiers.length === 0) {
                start = last?.start;
                pos = last?.pos;
            } else {
                start = identifiers[0]?.start;
                pos = identifiers[0]?.pos;
            }

            return {
                kind: 'PropertyAccessExpression',
                start: start,
                end: last?.end,
                pos: pos,
                children: [
                    toPropertyAccessExpression(identifiers, methodInvocationSuffix.length > 0, methodInvocationSuffix),
                    {...last, type: 'function'}
                ].filter(e => e !== undefined)
            };
        } else {
            return {
                kind: 'PropertyAccessExpression',
                start: identifiers[0]?.start,
                end: last?.end,
                pos: identifiers[0]?.pos,
                children: [
                    toPropertyAccessExpression(identifiers, false, methodInvocationSuffix),
                    last
                ].filter(e => e !== undefined)
            };
        }
    }
}
