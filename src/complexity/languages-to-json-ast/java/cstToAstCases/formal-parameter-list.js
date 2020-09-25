"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const formalParameter = children.formalParameter;
    return [
        ...formalParameter.map(e => cstToAst_1.cstToAst(e))
    ];
    // return {
    //     kind: 'FormalParameterList',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...formalParameter.map(e => cstToAst(e))
    //     ]
    // };
}
exports.run = run;