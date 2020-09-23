"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const Double = children.Double;
    return [
        ...Double.map(e => cstToAst_1.cstToAst(e, 'double'))
    ];
    // return {
    //     kind: 'IntegralType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...int.map(e => cstToAst(e, 'int')),
    //     ]
    // };
}
exports.run = run;
