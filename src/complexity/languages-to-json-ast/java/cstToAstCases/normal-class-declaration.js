"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const typeIdentifier = children.typeIdentifier;
    const classBody = children.classBody;
    return [
        ...[].concat(...typeIdentifier.map(e => cstToAst_1.cstToAst(e))),
        ...[].concat(...classBody.map(e => cstToAst_1.cstToAst(e))),
    ];
    // return {
    //     kind: 'NormalClassDeclaration',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...typeIdentifier.map(e => cstToAst(e))),
    //         ...[].concat(...classBody.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
