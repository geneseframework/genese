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
                    {
                        kind: 'PropertyAccessExpression',
                        start: primaryPrefixAst.find(e => e.kind === 'ThisKeyword').start,
                        end: primarySuffixAst.find(e => e.kind === 'Identifier').end,
                        pos: primaryPrefixAst.find(e => e.kind === 'ThisKeyword').start,
                        children: [
                            primaryPrefixAst.find(e => e.kind === 'ThisKeyword'),
                            {...primarySuffixAst.find(e => e.kind === 'Identifier'), type: 'function'}
                        ]
                    },
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
                    {...primarySuffixAst.find(e => e.kind === 'Identifier'), type: 'function'}
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
