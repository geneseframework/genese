import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);

    const methodInvocationSuffix = primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix');
    const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');
    const identifierPrefix = primaryPrefixAst.filter(e => e.kind === 'Identifier');
    const lambdaExpression = methodInvocationSuffix?.children.find(e => e.kind === 'LambdaExpression');

    if (methodInvocationSuffix) {
        if (thisKeyword) {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    toPropertyAccessExpression([
                        thisKeyword,
                        ...primarySuffixAst.filter(e => e.kind === 'Identifier')
                    ], true),
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
                ]
            };
        } else if(lambdaExpression) {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
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
            };
        } else {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    toPropertyAccessExpression([
                        ...primaryPrefixAst.filter(e => e.kind === 'Identifier'),
                        ...primarySuffixAst.filter(e => e.kind === 'Identifier')
                    ], true),
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
                ]
            };
        }
    } else {
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
