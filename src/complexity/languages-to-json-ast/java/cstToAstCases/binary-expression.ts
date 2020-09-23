import { cstToAst, getBinaryOperatorName } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperator = children.BinaryOperator?.[0];

    const unaryExpressionsAst = unaryExpressions.map(e => cstToAst(e));

    if (binaryOperator) {
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                unaryExpressionsAst[0],
                {
                    kind: getBinaryOperatorName(binaryOperator.image),
                    start: binaryOperator.startOffset,
                    end: binaryOperator.endOffset,
                },
                unaryExpressionsAst[1]
            ]
        };
    } else {
        return unaryExpressionsAst[0];
    }
}
