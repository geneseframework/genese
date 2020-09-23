"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const classBodyDeclaration = children.classBodyDeclaration;
    return [
        ...[].concat(...classBodyDeclaration.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'ClassBody',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...classBodyDeclaration.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
