import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);

    if (primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix')) {
        if (primaryPrefixAst.find(e => e.kind === 'ThisKeyword')) {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    toPropertyAccessExpression([
                        primaryPrefixAst.find(e => e.kind === 'ThisKeyword'),
                        ...primarySuffixAst.filter(e => e.kind === 'Identifier')
                    ], true),
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
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
                        ...primaryPrefixAst.filter(e => e.kind === 'Identifier')
                    ], true),
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
                ]
            };
        }
    } else {
        if (primaryPrefixAst.length === 1) {
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
                    toPropertyAccessExpression(identifiers),
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
