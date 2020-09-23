"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const expression = children.expression;
    const switchBlock = children.switchBlock;
    return {
        kind: 'SwitchStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_a = expression === null || expression === void 0 ? void 0 : expression.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
            ...[].concat(...(_b = switchBlock === null || switchBlock === void 0 ? void 0 : switchBlock.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
        ]
    };
}
exports.run = run;
