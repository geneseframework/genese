"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const Public = children.Public;
    return {
        kind: 'ClassModifier',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...Public.map(e => cstToAst_1.cstToAst(e, 'public')),
        ]
    };
}
exports.run = run;
