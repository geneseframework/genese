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
