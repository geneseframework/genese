"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;
    return {
        kind: 'MethodHeader',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...result.map(e => cstToAst_1.cstToAst(e)),
            ...methodDeclarator.map(e => cstToAst_1.cstToAst(e)),
        ]
    };
}
exports.run = run;
