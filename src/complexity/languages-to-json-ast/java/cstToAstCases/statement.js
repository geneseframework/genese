"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c;
    const statementWithoutTrailingSubstatement = children.statementWithoutTrailingSubstatement;
    const ifStatement = children.ifStatement;
    const whileStatement = children.whileStatement;
    return [
        ...[].concat(...(_a = statementWithoutTrailingSubstatement === null || statementWithoutTrailingSubstatement === void 0 ? void 0 : statementWithoutTrailingSubstatement.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = ifStatement === null || ifStatement === void 0 ? void 0 : ifStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
        ...(_c = whileStatement === null || whileStatement === void 0 ? void 0 : whileStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _c !== void 0 ? _c : [],
    ];
}
exports.run = run;
