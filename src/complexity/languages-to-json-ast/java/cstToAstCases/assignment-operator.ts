import { cstToAst, getBinaryOperatorName } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return {
        kind: getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
