"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: 'PrefixUnaryExpression',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        children: []
    };
}
exports.run = run;
