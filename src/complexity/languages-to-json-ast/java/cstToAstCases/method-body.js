"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const block = children.block;
    return [
        ...block.map(e => cstToAst_1.cstToAst(e)),
    ];
    // return {
    //     kind: 'MethodBody',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...block.map(e => cstToAst(e)),
    //     ]
    // };
}
exports.run = run;
