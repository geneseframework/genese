"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const identifier = children.Identifier;
    return {
        kind: 'VariableDeclaratorId',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...identifier.map(e => cstToAst_1.cstToAst(e, 'identifier'))
        ]
    };
}
exports.run = run;
