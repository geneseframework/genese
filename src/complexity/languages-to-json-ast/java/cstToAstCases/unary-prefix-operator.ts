import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return {
        kind: 'PrefixUnaryExpression',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        children: []
    };
}
