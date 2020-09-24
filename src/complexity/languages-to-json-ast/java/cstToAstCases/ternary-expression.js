"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const binaryExpressions = children.binaryExpression;
    return [
        ...[].concat(...(_a = binaryExpressions === null || binaryExpressions === void 0 ? void 0 : binaryExpressions.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : [])
    ];
}
exports.run = run;
