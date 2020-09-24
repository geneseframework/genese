"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const variableParaRegularParameter = children.variableParaRegularParameter;
    return {
        kind: cstToAst_1.getAlias('FormalParameter'),
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...variableParaRegularParameter.map(e => cstToAst_1.cstToAst(e)))
        ]
    };
}
exports.run = run;