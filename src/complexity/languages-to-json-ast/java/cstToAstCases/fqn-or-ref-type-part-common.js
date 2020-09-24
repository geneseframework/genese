"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const identifier = children.Identifier;
    return [
        ...(_a = identifier === null || identifier === void 0 ? void 0 : identifier.map(e => cstToAst_1.cstToAst(e, 'identifier'))) !== null && _a !== void 0 ? _a : []
    ];
    // return {
    //     kind: 'FqnOrRefTypePartCommon',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    //     ]
    // };
}
exports.run = run;
