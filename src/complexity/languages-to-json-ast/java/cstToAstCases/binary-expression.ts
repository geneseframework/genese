import { cstToAst, getBinaryOperatorName } from '../cstToAst';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;

    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst(e)))];

    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst(e, 'binaryOperator'));
        // const t = toBin(binaryOperatorsAst, unaryExpressionsAst);
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

function toBin(_ops, _exps) {
    if (_ops.length > 1) {
        const firstExp = _exps.shift();
        const firstOp = _ops.shift();
        return {
            kind: 'binary',
            children: [firstExp, firstOp, toBin(_ops, _exps)]
        }
        // return  [firstExp, firstOp, toBin(_ops, _exps)]
    } else {
        return {
            kind: 'binary',
            children: [_exps[0], _ops[0], _exps[1]]
        }
        // return [_exps[0], _ops[0], _exps[1]]
    }
}
