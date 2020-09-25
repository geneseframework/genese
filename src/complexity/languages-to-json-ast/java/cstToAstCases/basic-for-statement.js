"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c, _d;
    const forInit = children.forInit;
    const expression = children.expression;
    const forUpdate = children.forUpdate;
    const statement = children.statement;
    return [
        ...[].concat(...(_a = forInit === null || forInit === void 0 ? void 0 : forInit.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = expression === null || expression === void 0 ? void 0 : expression.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
        ...[].concat(...(_c = forUpdate === null || forUpdate === void 0 ? void 0 : forUpdate.map(e => cstToAst_1.cstToAst(e))) !== null && _c !== void 0 ? _c : []),
        ...[].concat(...(_d = statement === null || statement === void 0 ? void 0 : statement.map(e => cstToAst_1.cstToAst(e))) !== null && _d !== void 0 ? _d : [])
    ];
}
exports.run = run;
