"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;
    return [
        ...[].concat(...(_a = primaryPrefix === null || primaryPrefix === void 0 ? void 0 : primaryPrefix.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = primarySuffix === null || primarySuffix === void 0 ? void 0 : primarySuffix.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
    ];
}
exports.run = run;
