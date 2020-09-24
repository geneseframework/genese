import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return {
        kind: 'DecimalLiteral',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
}
