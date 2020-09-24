import { cstToAst } from '../cstToAst';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;

    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst(e)))];

    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst(e, 'binaryOperator'));
        return toBinaryExpression(binaryOperatorsAst, unaryExpressionsAst);
    } else {
        return unaryExpressionsAst[0];
    }
}

function toBinaryExpression(_ops, _exps) {
    if (_ops.length > 0) {
        const firstExp = _exps.shift();
        const firstOp = _ops.shift();
        return {
            kind: 'BinaryExpression',
            start: firstExp.start,
            end: _exps[_exps.length - 1].end,
            pos: firstExp.pos,
            children: [firstExp, firstOp, toBinaryExpression(_ops, _exps)]
        }
    } else {
        const children = [_exps[0], _ops[0], _exps[1]].filter(e => e)
        if (children.length > 1) {
            return {
                kind: 'BinaryExpression',
                start: _exps[0].start,
                end: _exps[1].end,
                pos: _exps[0].pos,
                children: children
            }
        } else {
            return children[0]
        }
    }
}
