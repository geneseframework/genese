import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

class ElementObject {
    kind?: string = '';
    start?: number;
    end?: number;
    pos?: number;
    children?: any[] = [];
}
export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAstList = [].concat(primarySuffix?.map(e => cstToAst(e)) ?? []);


    const objArray = [];
    if (Array.isArray(primarySuffixAstList)) {

        primarySuffixAstList.forEach(primarySuffixAst => {

            // On créer un objet qui nous sert de base
            const obj: ElementObject = new ElementObject()
            obj.kind = 'CallExpression';
            obj.start = cstNode.location.startOffset;
            obj.end = cstNode.location.endOffset;
            obj.pos = cstNode.location.startOffset;

            // On initialise toutes les constantes dont on aura besoin
            const methodInvocationSuffix = primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix');
            const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');
            const identifierPrefix = primaryPrefixAst.filter(e => e.kind === 'Identifier');
            const identifierSuffix = primarySuffixAst.filter(e => e.kind === 'Identifier');
            const lambdaExpression = methodInvocationSuffix?.children.find(e => e.kind === 'LambdaExpression');

            // On fait le traitement sur l'objet
            // Pour chaque situation, on créer une fonction
            if (methodInvocationSuffix) {

                if (thisKeyword) {
                    obj.children = getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix);
                } else if (lambdaExpression) {
                    obj.children = getLambdaExpressionChildren(lambdaExpression, cstNode, identifierPrefix);
                } else {
                    obj.children = getOtherCasesChildren(primaryPrefixAst, primarySuffixAst);
                }

                objArray.push(obj);

            } else {
                objArray.push(...handleNoMethodInvocationSuffix(primaryPrefixAst, primarySuffixAst))
            }

        })

        return objArray;

    }


}

function handleNoMethodInvocationSuffix(primaryPrefixAst: any, primarySuffixAst: any) {
    if (primaryPrefixAst.length <= 1) {
        return [
            ...primaryPrefixAst,
            ...primarySuffixAst
        ];
    } else {
        return [
            toPropertyAccessExpression(primaryPrefixAst),
            ...primarySuffixAst
        ];
    }
}

function getLambdaExpressionChildren(lambdaExpression: any, cstNode: Primary, identifierPrefix: any): any[] {
    return [
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
                ...lambdaExpression.children.filter(e => e.kind === 'Parameter'),
                ...lambdaExpression.children.filter(e => e.kind === 'EqualsGreaterThanToken'),
                lambdaExpression.children.find(e => e.kind === 'ArrowFunction').children
                    .find(e => e.kind === 'Block')
            ]
        }
    ]
}

function getThisKeywordChildren(methodInvocationSuffix: any, thisKeyword: any, identifierSuffix: any): any[] {
    return [
        toPropertyAccessExpression([
            thisKeyword,
            ...identifierSuffix
        ], true),
        ...methodInvocationSuffix.children
    ]
}

function getOtherCasesChildren(primaryPrefixAst: any, primarySuffixAst: any): any[] {
    return [
        toPropertyAccessExpression([
            ...primaryPrefixAst.filter(e => e.kind === 'Identifier'),
            ...primarySuffixAst.filter(e => e.kind === 'Identifier')
        ], true),
        ...primarySuffixAst.filter(e => e.kind === 'ClassLiteralSuffix'),
        ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
    ]
}



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
                    { ...last, type: 'function' }
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
