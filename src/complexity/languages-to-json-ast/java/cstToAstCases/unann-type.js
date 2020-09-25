"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const unannPrimitiveType = children.unannPrimitiveType;
    return [
        ...[].concat(...(_a = unannPrimitiveType === null || unannPrimitiveType === void 0 ? void 0 : unannPrimitiveType.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
    ];
    // return {
    //     kind: 'UnannType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...unannPrimitiveType.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
