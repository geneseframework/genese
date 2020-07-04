"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomicCpx = void 0;
/**
 * The Complexity Category "atomic"
 */
class AtomicCpx {
    constructor() {
        this.declaration = 0; // Declaration of a Class, a Function, a Method, ...
        this.empty = 0;
        this.imp = 0; // Element imported from another file
        this.keyword = 0;
        this.literal = 0;
        this.node = 0; // Any AST node ("Identifier", " ", "Block", IfStatement, ...)
    }
}
exports.AtomicCpx = AtomicCpx;
