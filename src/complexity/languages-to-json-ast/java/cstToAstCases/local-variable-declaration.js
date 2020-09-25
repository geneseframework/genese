"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c, _d;
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_b = (_a = children.localVariableType) === null || _a === void 0 ? void 0 : _a.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
            ...[].concat(...(_d = (_c = children.variableDeclaratorList) === null || _c === void 0 ? void 0 : _c.map(e => cstToAst_1.cstToAst(e))) !== null && _d !== void 0 ? _d : [])
        ]
    };
}
exports.run = run;
