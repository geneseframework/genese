import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

// @ts-ignore
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
                    ], primarySuffixAst.filter(e => e.kind === 'Identifier').length === 1),
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
                    ]),
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
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

function toPropertyAccessExpression(identifiers: any[], lastTwo = false): any {
    if (!identifiers) return undefined;
    if (identifiers.length === 2) {
        if (lastTwo) {
            return {
                kind: 'PropertyAccessExpression',
                start: identifiers[0].start,
                end: identifiers[1].end,
                pos: identifiers[0].pos,
                children: [
                    identifiers[0],
                    {...identifiers[1], type: 'function'}
                ]
            };
        } else {
            return {
                kind: 'PropertyAccessExpression',
                start: identifiers[0].start,
                end: identifiers[1].end,
                pos: identifiers[0].pos,
                children: identifiers
            };
        }
    } else if (identifiers.length > 1) {
        const first = identifiers.shift();
        const second = identifiers.shift();
        return {
            kind: 'PropertyAccessExpression',
            start: first.start,
            end: identifiers[identifiers.length - 1].end,
            pos: first.pos,
            children: [toPropertyAccessExpression([first, second], identifiers.length === 0), toPropertyAccessExpression(identifiers)]
        };
    } else {
        return {...identifiers[0], type: 'function'}
    }
}
