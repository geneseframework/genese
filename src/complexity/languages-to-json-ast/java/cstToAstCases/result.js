"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unannType = children.unannType;
    return [
        ...[].concat(...unannType.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'Result',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...unannType.map(e => cstToAst(e)),
    //     ]
    // };
}
exports.run = run;