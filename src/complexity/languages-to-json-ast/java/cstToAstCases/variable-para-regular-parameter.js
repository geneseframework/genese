"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unannType = children.unannType;
    const variableDeclaratorId = children.variableDeclaratorId;
    return {
        kind: 'VariableParaRegularParameter',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...unannType.map(e => cstToAst_1.cstToAst(e)),
            ...variableDeclaratorId.map(e => cstToAst_1.cstToAst(e))
        ]
    };
}
exports.run = run;
