"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c, _d;
    const parenthesisExpression = children.parenthesisExpression;
    const fqnOrRefType = children.fqnOrRefType;
    const literal = children.literal;
    const this_ = children.This;
    return [
        ...(_a = parenthesisExpression === null || parenthesisExpression === void 0 ? void 0 : parenthesisExpression.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : [],
        ...[].concat(...(_b = fqnOrRefType === null || fqnOrRefType === void 0 ? void 0 : fqnOrRefType.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
        ...[].concat(...(_c = literal === null || literal === void 0 ? void 0 : literal.map(e => cstToAst_1.cstToAst(e))) !== null && _c !== void 0 ? _c : []),
        ...(_d = this_ === null || this_ === void 0 ? void 0 : this_.map(e => cstToAst_1.cstToAst(e, 'this'))) !== null && _d !== void 0 ? _d : []
    ];
    // return {
    //     kind: 'PrimaryPrefix',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...parenthesisExpression?.map(e => cstToAst(e)) ?? [],
    //         ...fqnOrRefType?.map(e => cstToAst(e)) ?? [],
    //     ]
    // };
}
exports.run = run;
