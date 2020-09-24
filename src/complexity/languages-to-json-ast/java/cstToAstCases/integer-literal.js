"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a;
    const decimalLiteral = children.DecimalLiteral;
    return {
        kind: 'IntegerLiteral',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(_a = decimalLiteral === null || decimalLiteral === void 0 ? void 0 : decimalLiteral.map(e => cstToAst_1.cstToAst(e, 'decimalLiteral'))) !== null && _a !== void 0 ? _a : [])
        ]
    };
}
exports.run = run;
