import { cstToAst, getBinaryOperatorName } from '../cstToAst';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;

    const unaryExpressionsAst = unaryExpressions.map(e => cstToAst(e));

    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst(e, 'binaryOperator'));
        const t = binaryOperatorsAst.map((op, i) => {
            switch (op.kind) {
                case 'AsteriskToken':
                    return [
                        unaryExpressionsAst[i],
                        op,
                        unaryExpressionsAst[i+1]
                    ];
                default:
                    return {
                        exp: unaryExpressionsAst[i],
                        op,
                    }
            }
        });
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                ...[].concat(...unaryExpressionsAst.map((unaryExp, i) => {
                    return [
                        ...unaryExp,
                        binaryOperatorsAst?.[i],
                    ]
                }))
            ].filter(e => e)
        };
    } else {
        return unaryExpressionsAst[0];
    }
}
