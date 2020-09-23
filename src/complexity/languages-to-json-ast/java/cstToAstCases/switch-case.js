"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const blockStatements = children.blockStatements;
    return {
        kind: 'CaseBlock',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...blockStatements.map(e => cstToAst_1.cstToAst(e))),
        ]
    };
}
exports.run = run;
