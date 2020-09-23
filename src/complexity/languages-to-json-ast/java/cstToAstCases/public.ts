import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return {
        kind: 'Public',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        name: cstNode.image
    };
}
