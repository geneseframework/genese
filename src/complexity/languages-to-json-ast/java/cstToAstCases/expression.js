"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const ternaryExpressions = children.ternaryExpression;
    const lambdaExpression = children.lambdaExpression;
    return [
        ...[].concat(...(_a = ternaryExpressions === null || ternaryExpressions === void 0 ? void 0 : ternaryExpressions.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = lambdaExpression === null || lambdaExpression === void 0 ? void 0 : lambdaExpression.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
    ];
}
exports.run = run;
