import { cstToAst, getBinaryOperatorName } from '../cst-to-ast';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren): any {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const less = children.Less;
    const greater = children.Greater;

    const assignmentOperator = children.AssignmentOperator;
    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst(e)))];
    if (binaryOperators || less || greater) {
        const binaryOperatorsAst = binaryOperators?.map(e => cstToAst(e, 'binaryOperator')) ?? [];
        if (less) {
            binaryOperatorsAst.push({
                kind: getBinaryOperatorName(less.map(e => e.image).join('')),
                start: less[0].startOffset,
                end: less[less.length - 1].endOffset,
                pos: less[0].startOffset
            })
        }
        if (greater) {
            binaryOperatorsAst.push({
                kind: getBinaryOperatorName(greater.map(e => e.image).join('')),
                start: greater[0].startOffset,
                end: greater[greater.length - 1].endOffset,
                pos: greater[0].startOffset
            })
        }
        const alternate = [];
        for (let i = 0; i < binaryOperatorsAst.length; i++) {
            alternate.push(unaryExpressionsAst[i], binaryOperatorsAst[i]);
        }
        alternate.push(...unaryExpressionsAst.slice(binaryOperatorsAst.length), ...binaryOperatorsAst.slice(binaryOperatorsAst.length));
        const separatedExps = split(alternate);
        return toBinaryExpression(separatedExps.op, separatedExps.left, separatedExps.right);
    } else if (assignmentOperator) {
        const expression = children.expression;
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

function split(list) {
    if (list.length === 1) {
        return list[0];
    }
    const operatorsOrder = [
        [SyntaxKind.EqualsToken, SyntaxKind.PlusEqualsToken, SyntaxKind.MinusEqualsToken, SyntaxKind.AsteriskEqualsToken, SyntaxKind.SlashEqualsToken, SyntaxKind.PercentEqualsToken, SyntaxKind.AmpersandEqualsToken, SyntaxKind.CaretEqualsToken, SyntaxKind.BarEqualsToken, SyntaxKind.LessThanLessThanEqualsToken, SyntaxKind.GreaterThanGreaterThanEqualsToken, SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken],
        [SyntaxKind.QuestionToken, SyntaxKind.ColonToken],
        [SyntaxKind.BarBarToken],
        [SyntaxKind.AmpersandAmpersandToken],
        [SyntaxKind.BarToken],
        [SyntaxKind.CaretToken],
        [SyntaxKind.AmpersandToken],
        [SyntaxKind.EqualsEqualsToken, SyntaxKind.ExclamationEqualsToken],
        [SyntaxKind.LessThanToken, SyntaxKind.LessThanEqualsToken, SyntaxKind.GreaterThanToken, SyntaxKind.GreaterThanEqualsToken],
        [SyntaxKind.LessThanLessThanToken, SyntaxKind.GreaterThanGreaterThanToken, SyntaxKind.GreaterThanGreaterThanGreaterThanToken],
        [SyntaxKind.PlusToken, SyntaxKind.MinusToken],
        [SyntaxKind.AsteriskToken, SyntaxKind.SlashToken, SyntaxKind.PercentToken],
    ];
    const r = {
        op: undefined,
        left: undefined,
        right: undefined
    };
    operatorsOrder.forEach(ops => {
        const index = list.findIndex(e => ops.includes(e.kind));
        if (index !== -1 && !r.op) {
            r.op = list[index];
            r.left = split(list.slice(0, index));
            r.right = split(list.slice(index + 1, list.length + 1));
        }
    });
    return r;
}

function toBinaryExpression(op, left, right): any {
    const children = [
        left.op ? toBinaryExpression(left.op, left.left, left.right) : left,
        op,
        right.op ? toBinaryExpression(right.op, right.left, right.right) : right,
    ]
    let mostLeft = left;
    while (mostLeft.left) {
        mostLeft = mostLeft.left;
    }
    let mostRight = right;
    while (mostRight.right) {
        mostRight = mostRight.right;
    }
    return {
        kind: 'BinaryExpression',
        start: mostLeft.start,
        end: mostRight.right,
        pos: mostLeft.pos,
        children: children
    };
}
