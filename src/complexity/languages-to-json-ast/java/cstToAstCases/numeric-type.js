"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const integralType = children.integralType;
    const floatingPointType = children.floatingPointType;
    return [
        ...[].concat(...(_a = integralType === null || integralType === void 0 ? void 0 : integralType.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []),
        ...[].concat(...(_b = floatingPointType === null || floatingPointType === void 0 ? void 0 : floatingPointType.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []),
    ];
    // return {
    //     kind: 'NumericType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...integralType.map(e => cstToAst(e))),
    //     ]
    // };
}
exports.run = run;
