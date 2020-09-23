import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {

    return {
        kind: 'Int',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
}
