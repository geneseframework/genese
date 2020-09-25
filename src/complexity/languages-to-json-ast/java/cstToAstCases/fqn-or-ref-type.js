"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const fqnOrRefTypePartFirst = children.fqnOrRefTypePartFirst;
    const fqnOrRefTypePartRest = children.fqnOrRefTypePartRest;
    return [
        ...[].concat(...(_a = fqnOrRefTypePartFirst === null || fqnOrRefTypePartFirst === void 0 ? void 0 : fqnOrRefTypePartFirst.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = fqnOrRefTypePartRest === null || fqnOrRefTypePartRest === void 0 ? void 0 : fqnOrRefTypePartRest.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : [])
    ];
    // return {
    //     kind: 'FqnOrRefType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
exports.run = run;
