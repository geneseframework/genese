"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const numericType = children.numericType;
    return [
        ...[].concat(...(_a = numericType === null || numericType === void 0 ? void 0 : numericType.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
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
