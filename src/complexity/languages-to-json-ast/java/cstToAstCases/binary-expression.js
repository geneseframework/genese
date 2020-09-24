"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const unaryExpressionsAst = unaryExpressions.map(e => cstToAst_1.cstToAst(e));
    if (binaryOperators) {
        const binaryOperatorsAst = binaryOperators.map(e => cstToAst_1.cstToAst(e, 'binaryOperator'));
        const t = binaryOperatorsAst.map((op, i) => {
            switch (op.kind) {
                case 'AsteriskToken':
                    return [
                        unaryExpressionsAst[i],
                        op,
                        unaryExpressionsAst[i + 1]
                    ];
                default:
                    return {
                        exp: unaryExpressionsAst[i],
                        op,
                    };
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
