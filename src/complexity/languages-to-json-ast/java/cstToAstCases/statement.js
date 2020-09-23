"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const statementWithoutTrailingSubstatement = children.statementWithoutTrailingSubstatement;
    const ifStatement = children.ifStatement;
    return [
        ...[].concat(...(_a = statementWithoutTrailingSubstatement === null || statementWithoutTrailingSubstatement === void 0 ? void 0 : statementWithoutTrailingSubstatement.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = ifStatement === null || ifStatement === void 0 ? void 0 : ifStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
    ];
}
exports.run = run;
