"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const basicForStatement = children.basicForStatement;
    const enhancedForStatement = children.enhancedForStatement;
    return {
        kind: 'ForStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_a = basicForStatement === null || basicForStatement === void 0 ? void 0 : basicForStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
            ...[].concat(...(_b = enhancedForStatement === null || enhancedForStatement === void 0 ? void 0 : enhancedForStatement.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
        ]
    };
}
exports.run = run;
