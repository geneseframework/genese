"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StructuralCpx {
    constructor() {
        this.arr = 0; // "Array", "Set"
        this.asynchronicity = 0; // "Promise", "Observable"
        this.conditional = 0; // "if", "else", "else if", "switch", "catch", ternary expression, nullish coalescing
        this.externalBinding = 0; // A "this" inside a method which not refers to the method context (its class)
        this.func = 0; // Usage of a function or method inside a block of code
        this.jump = 0; // "break", "continue"
        this.logicDoor = 0; // "and", "or", "not"
        this.loop = 0; // "for", "foreach", "while"
        this.recursion = 0; // Recursion or callback
        this.regex = 0; // Regular expression
    }
}
exports.StructuralCpx = StructuralCpx;
