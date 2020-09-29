import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

// @ts-ignore
export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);

    const methodInvocationSuffix = primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix');
    const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');
    const identifier = primarySuffixAst.find(e => e.kind === 'Identifier');
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
                        {
                            kind: 'PropertyAccessExpression',
                            start: thisKeyword.start,
                            end: identifier.end,
                            pos: thisKeyword.start,
                            children: [
                                thisKeyword,
                                {...identifier, type: 'function'}
                            ]
                        },
                    ...methodInvocationSuffix.children
                    ]
            };
        } 
        else if(lambdaExpression) {
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
                    {...identifier, type: 'function'}
                ]
            };
        }
    } else {
        return [
            ...primaryPrefixAst,
            ...primarySuffixAst
        ];
    }
}
