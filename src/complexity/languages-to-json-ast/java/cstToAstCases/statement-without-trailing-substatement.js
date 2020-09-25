"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c, _d, _e;
    const block = children.block;
    const returnStatement = children.returnStatement;
    const switchStatement = children.switchStatement;
    const expressionStatement = children.expressionStatement;
    const doStatement = children.doStatement;
    return [
        ...(_a = block === null || block === void 0 ? void 0 : block.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : [],
        ...(_b = returnStatement === null || returnStatement === void 0 ? void 0 : returnStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [],
        ...(_c = switchStatement === null || switchStatement === void 0 ? void 0 : switchStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _c !== void 0 ? _c : [],
        ...(_d = expressionStatement === null || expressionStatement === void 0 ? void 0 : expressionStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _d !== void 0 ? _d : [],
        ...(_e = doStatement === null || doStatement === void 0 ? void 0 : doStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _e !== void 0 ? _e : []
    ];
}
exports.run = run;
