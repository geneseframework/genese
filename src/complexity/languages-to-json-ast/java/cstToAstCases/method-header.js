"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;
    return [
        ...[].concat(...result.map(e => cstToAst_1.cstToAst(e))),
        ...[].concat(...methodDeclarator.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'MethodHeader',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...result.map(e => cstToAst(e))),
    //         ...[].concat(...methodDeclarator.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
