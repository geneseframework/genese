import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const integerLiteral = children.integerLiteral;

    return {
        kind: 'Literal',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        // children: [
        //     ...[].concat(...integerLiteral?.map(e => cstToAst(e)) ?? [])
        // ]
    };
}
