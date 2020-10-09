import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);
    
    const methodInvocationSuffix = primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix');

    if (methodInvocationSuffix) {
        return handleMethodInvocationSuffix(cstNode, primaryPrefixAst, primarySuffixAst, methodInvocationSuffix);
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
        toPropertyAccessExpression(primaryPrefixAst),
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
    const lambdaExpression = methodInvocationSuffix?.children.find(e => e.kind === 'LambdaExpression');

    const identifierSuffix = primarySuffixAst.filter(e => e.kind === 'Identifier');
    const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');
    const identifierPrefix = primaryPrefixAst.filter(e => e.kind === 'Identifier');
    
    let obj = {
        kind: 'CallExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
    } 

    if (thisKeyword) {
        return getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix, obj);
    } else if(lambdaExpression) {
        return getLambdaExpression(lambdaExpression, cstNode, identifierPrefix, obj);
    }
    return getOtherCasesChildren(primaryPrefixAst, primarySuffixAst, obj);
}

/**
 * @param  {any} methodInvocationSuffix
 * @param  {any} thisKeyword
 * @param  {any} identifierSuffix
 * @param  {any} obj
 * @returns any
 */
function getThisKeywordChildren(methodInvocationSuffix: any, thisKeyword: any, identifierSuffix: any, obj: any): any[] {
    return { ...obj,
            children :[
            toPropertyAccessExpression([
                thisKeyword,
                ...identifierSuffix
            ], true),
            ...methodInvocationSuffix.children
        ]
    }
}

/**
 * @param  {any} lambdaExpression
 * @param  {Primary} cstNode
 * @param  {any} identifierPrefix
 * @param  {any} obj
 * @returns any
 */
function getLambdaExpression(lambdaExpression: any, cstNode: Primary, identifierPrefix: any, obj: any): any[] {
    return { ...obj,
            children :[
            {
                kind: 'PropertyAccessExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    ...identifierPrefix,
                ]
            },
            {
                kind: 'ArrowFunction',
                start: lambdaExpression.start,
                end: lambdaExpression.end,
                pos: lambdaExpression.pos,
                children: [
                    ...getLambdaExpressionChildren(lambdaExpression)
                ]
            }
        ]
    }
}

/**
 * @param  {any} lambdaExpression
 * @returns any
 */
function getLambdaExpressionChildren(lambdaExpression: any): any[] {
    
    const lambdaExpressionChildren = lambdaExpression.children;

    const block = lambdaExpressionChildren.find(e => e.kind === 'ArrowFunction').children.find(e => e.kind === 'Block');
    const callExpression = lambdaExpressionChildren.find(e => e.kind === 'ArrowFunction').children.find(e => e.kind === 'CallExpression')

    const children = [
        ...lambdaExpressionChildren.filter(e => e.kind === 'Parameter'),
        ...lambdaExpressionChildren.filter(e => e.kind === 'EqualsGreaterThanToken'),
    ]
    if(block) {
        children.push(block);
    } else if(callExpression){
        children.push(callExpression);
    }
    return children;
}

/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param  {any} obj
 * @returns any
 */
function getOtherCasesChildren(primaryPrefixAst: any, primarySuffixAst: any, obj: any): any[] {
    return { ...obj,
            children :[
            toPropertyAccessExpression([
                ...primaryPrefixAst.filter(e => e.kind === 'Identifier'),
                ...primarySuffixAst.filter(e => e.kind === 'Identifier')
            ], true),
            ...primarySuffixAst.filter(e => e.kind === 'ClassLiteralSuffix'),
            ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
        ]
    }
}

/**
 * @param  {any[]} identifiers
 * @param  {} isFunctionCall=false
 * @returns any
 */
function toPropertyAccessExpression(identifiers: any[], isFunctionCall = false): any {
    if (!identifiers) return undefined;

    if (identifiers.length === 1) {
        return identifiers[0];
    } else {
        const last = identifiers.pop();

        if (isFunctionCall) {
            return {
                kind: 'PropertyAccessExpression',
                start: identifiers[0].start,
                end: last.end,
                pos: identifiers[0].pos,
                children: [
                    toPropertyAccessExpression(identifiers, true),
                    {...last, type: 'function'}
                ]
            };
        } else {
            return {
                kind: 'PropertyAccessExpression',
                start: identifiers[0].start,
                end: last.end,
                pos: identifiers[0].pos,
                children: [
                    toPropertyAccessExpression(identifiers),
                    last
                ]
            };
        }
    }
}