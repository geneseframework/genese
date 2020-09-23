"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const classModifier = children.classModifier;
    const normalClassDeclaration = children.normalClassDeclaration;
    return {
        kind: 'ClassDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            // ...classModifier.map(e => cstToAst(e)),
            ...[].concat(...normalClassDeclaration.map(e => cstToAst_1.cstToAst(e))),
        ]
    };
}
exports.run = run;
