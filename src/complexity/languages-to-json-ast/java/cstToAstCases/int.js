"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: 'Int',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
}
exports.run = run;
