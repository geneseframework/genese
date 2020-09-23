"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const numericType = children.numericType;
    return [
        ...[].concat(...numericType.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'UnannPrimitiveType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...numericType.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
