"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const unaryExpressions = children.unaryExpression;
    const binaryOperator = (_a = children.BinaryOperator) === null || _a === void 0 ? void 0 : _a[0];
    const unaryExpressionsAst = unaryExpressions.map(e => cstToAst_1.cstToAst(e));
    if (binaryOperator) {
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: [
                unaryExpressionsAst[0],
                {
                    kind: cstToAst_1.getBinaryOperatorName(binaryOperator.image),
                    start: binaryOperator.startOffset,
                    end: binaryOperator.endOffset,
                },
                unaryExpressionsAst[1]
            ]
        };
    }
    else {
        return unaryExpressionsAst[0];
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
        // return [_exps[0], _ops[0], _exps[1]]
    }
}
