"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: 'Public',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        name: cstNode.image
    };
}
exports.run = run;
