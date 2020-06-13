"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AstNode {
    constructor() {
        this.children = [];
        this.end = 0;
        this.kind = undefined;
        this.pos = 0;
    }
}
exports.AstNode = AstNode;
