"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const classMemberDeclaration = children.classMemberDeclaration;
    return [
        ...[].concat(...classMemberDeclaration.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'ClassBodyDeclaration',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...classMemberDeclaration.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
