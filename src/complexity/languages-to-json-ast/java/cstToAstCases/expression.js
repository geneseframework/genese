"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const ternaryExpressions = children.ternaryExpression;
    return [
        ...[].concat(...(_a = ternaryExpressions.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : [])
    ];
}
exports.run = run;
