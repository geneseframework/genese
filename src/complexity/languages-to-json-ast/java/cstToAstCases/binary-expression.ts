import { cstToAst } from '../cst-to-ast';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { clone } from 'genese-mapper';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren): any {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const assignmentOperator = children.AssignmentOperator;
    const expression = children.expression;

    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst(e)))];

    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst(e, 'binaryOperator'));
        const andOrOperators = binaryOperatorsAst.filter(op => [SyntaxKind.BarBarToken, SyntaxKind.AmpersandAmpersandToken].includes(op.kind));

        if (andOrOperators.length > 0) {
            const andOrOperatorsIndexes = binaryOperatorsAst.map((op, i) => [SyntaxKind.BarBarToken, SyntaxKind.AmpersandAmpersandToken].includes(op.kind) ? i : -1).filter(e => e !== -1);

            andOrOperatorsIndexes.reverse().forEach(index => binaryOperatorsAst.splice(index, 1));

            const exps = [];

            andOrOperators.concat(null).forEach(_ => {
                exps.push([
                    binaryOperatorsAst.splice(0, 1),
                    unaryExpressionsAst.splice(0, 2)
                ]);
            });

            const binExps = exps.map(exp => toBinaryExpression(clone(exp[0]), clone(exp[1])));
            const children = binExps.reduce((res, exp, i) => res.concat(exp, andOrOperators[i]), []).filter(e => e);

            return [{
                kind: 'BinaryExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: children
            }];
        } else {
            return [
                toBinaryExpression(binaryOperatorsAst, unaryExpressionsAst)
            ];
        }
    } else if (assignmentOperator) {
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                ...unaryExpressionsAst,
                ...assignmentOperator?.map(e => cstToAst(e, 'assignmentOperator')) ?? [],
                ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
            ]
        };
    } else {
        return [
            ...unaryExpressionsAst,
        ];
    }
}

function toBinaryExpression(_ops, _exps): any {
    if (!_ops || !_exps) return undefined;
    if (_ops.length > 0) {
        const firstExp = _exps.shift();
        const firstOp = _ops.shift();
        return {
            kind: 'BinaryExpression',
            start: firstExp.start,
            end: _exps[_exps.length - 1]?.end,
            pos: firstExp.pos,
            children: [firstExp, firstOp, toBinaryExpression(_ops, _exps)]
        };
    } else {
        const children = [_exps[0], _ops[0], _exps[1]].filter(e => e);
        if (children.length > 1) {
            return {
                kind: 'BinaryExpression',
                start: _exps[0].start,
                end: _exps[1].end,
                pos: _exps[0].pos,
                children: children
            };
        } else {
            return children[0];
        }
    }
}
