"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const primaryPrefix = children.primaryPrefix;
    return [
        ...[].concat(...primaryPrefix.map(e => cstToAst_1.cstToAst(e)))
    ];
    // return {
    //     kind: 'Primary',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...primaryPrefix.map(e => cstToAst(e))
    //     ]
    // };
}
exports.run = run;
