"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const expression = children.expression;
    return {
        kind: 'StatementExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...(_a = expression === null || expression === void 0 ? void 0 : expression.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []
        ]
    };
}
exports.run = run;
