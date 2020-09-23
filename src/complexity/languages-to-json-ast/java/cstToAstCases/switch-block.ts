import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const switchCase = children.switchCase;

    return {
        kind: 'CaseBlock',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...switchCase.map(e => cstToAst(e))),
        ]
    };
}
