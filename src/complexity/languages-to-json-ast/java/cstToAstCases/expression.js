"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const ternaryExpression = children.ternaryExpression;
    return [...[].concat(...ternaryExpression.map(e => cstToAst_1.cstToAst(e)))];
}
exports.run = run;
