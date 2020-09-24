import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const decimalLiteral = children.DecimalLiteral;

    return {
        kind: 'IntegerLiteral',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...decimalLiteral?.map(e => cstToAst(e, 'decimalLiteral')) ?? [])
        ]
    };
}
