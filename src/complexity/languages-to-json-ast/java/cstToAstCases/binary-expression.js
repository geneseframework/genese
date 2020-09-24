"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const assignmentOperator = children.AssignmentOperator;
    const expression = children.expression;
    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst_1.cstToAst(e)))];
    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst_1.cstToAst(e, 'binaryOperator'));
        return [
            toBinaryExpression(binaryOperatorsAst, unaryExpressionsAst)
        ];
    }
    else if (assignmentOperator) {
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                ...unaryExpressionsAst,
                ...(_a = assignmentOperator === null || assignmentOperator === void 0 ? void 0 : assignmentOperator.map(e => cstToAst_1.cstToAst(e, 'assignmentOperator'))) !== null && _a !== void 0 ? _a : [],
                ...[].concat(...(_b = expression === null || expression === void 0 ? void 0 : expression.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
            ]
        };
    }
    else {
        return [
            ...unaryExpressionsAst,
        ];
    }
}
exports.run = run;
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
        };
    }
    else {
        const children = [_exps[0], _ops[0], _exps[1]].filter(e => e);
        if (children.length > 1) {
            return {
                kind: 'BinaryExpression',
                start: _exps[0].start,
                end: _exps[1].end,
                pos: _exps[0].pos,
                children: children
            };
        }
        else {
            return children[0];
        }
    }
}
