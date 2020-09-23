"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const expressions = children.expression;
    const statements = children.statement;
    return {
        kind: 'IfStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...expressions.map(e => cstToAst_1.cstToAst(e))),
            ...[].concat(...statements.map(e => cstToAst_1.cstToAst(e)))
        ]
    };
}
exports.run = run;
