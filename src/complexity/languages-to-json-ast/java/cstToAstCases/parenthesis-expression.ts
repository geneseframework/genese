import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const expression = children.expression;

    return {
        kind: 'ParenthesisExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expression.map(e => cstToAst(e)))
        ]
    };
}
