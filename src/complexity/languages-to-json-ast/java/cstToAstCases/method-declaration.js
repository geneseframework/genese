"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const methodHeader = children.methodHeader;
    const methodBody = children.methodBody;
    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...methodHeader.map(e => cstToAst_1.cstToAst(e))),
            ...[].concat(...methodBody.map(e => cstToAst_1.cstToAst(e))),
        ]
    };
}
exports.run = run;
