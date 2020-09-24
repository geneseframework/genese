"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst_1.cstToAst(e)))];
    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst_1.cstToAst(e, 'binaryOperator'));
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
                        binaryOperatorsAst === null || binaryOperatorsAst === void 0 ? void 0 : binaryOperatorsAst[i],
                    ];
                }))
            ].filter(e => e)
        };
    }
    else {
        return unaryExpressionsAst[0];
    }
}
exports.run = run;
function toBin(_ops, _exps) {
    if (_ops.length > 1) {
        const firstExp = _exps.shift();
        const firstOp = _ops.shift();
        return {
            kind: 'binary',
            children: [firstExp, firstOp, toBin(_ops, _exps)]
        };
        // return  [firstExp, firstOp, toBin(_ops, _exps)]
    }
    else {
        return {
            kind: 'binary',
            children: [_exps[0], _ops[0], _exps[1]]
        };
        // return [_exps[0], _ops[0], _exps[1]]
    }
}
