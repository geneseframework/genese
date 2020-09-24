"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const fqnOrRefTypePartCommon = children.fqnOrRefTypePartCommon;
    return [
        ...[].concat(...(_a = fqnOrRefTypePartCommon === null || fqnOrRefTypePartCommon === void 0 ? void 0 : fqnOrRefTypePartCommon.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : [])
    ];
    // return {
    //     kind: 'FqnOrRefTypePartFirst',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
exports.run = run;
