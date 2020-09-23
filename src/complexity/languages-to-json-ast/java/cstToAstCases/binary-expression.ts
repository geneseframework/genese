import { cstToAst, getBinaryOperatorName } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;

    const unaryExpressionsAst = unaryExpressions.map(e => cstToAst(e));

    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst(e, 'binaryOperator'));
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                ...[].concat(...unaryExpressionsAst.map((unaryExp, i) => {
                    return [
                        unaryExp,
                        binaryOperatorsAst?.[i],
                    ]
                }))
            ].filter(e => e)
        };
    } else {
        return unaryExpressionsAst[0];
    }
}
