"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: cstToAst_1.getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
exports.run = run;
