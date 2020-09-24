"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const switchCase = children.switchCase;
    return {
        kind: 'CaseBlock',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_a = switchCase.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ]
    };
}
exports.run = run;
