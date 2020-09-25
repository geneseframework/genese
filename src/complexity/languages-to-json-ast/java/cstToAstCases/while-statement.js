"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const expressions = children.expression;
    const statements = children.statement;
    return {
        kind: 'WhileStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_a = expressions.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
            ...[].concat(...(_b = statements.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
        ]
    };
}
exports.run = run;
