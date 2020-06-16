"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuralCpx = void 0;
/**
 * The Complexity Category "Structural"
 */
class StructuralCpx {
    constructor() {
        this.arr = 0; // "Array", "Set"
        this.asynchronicity = 0; // "Promise", "Observable"
        this.callback = 0; // Callback (call to a parameter of the parentFunction (ie method) of the node)
        this.conditional = 0; // "if", "else", "else if", "switch", "catch", nullish coalescing
        this.externalBinding = 0; // A "this" inside a method which not refers to the method parentFunction (its class)
        this.func = 0; // Usage of a function or method inside a block of code
        this.jump = 0; // "break", "continue"
        this.logicDoor = 0; // "and", "or", "not"
        this.loop = 0; // "for", "foreach", "while"
        this.recursion = 0; // Recursion (call to the node's method)
        this.regex = 0; // Regular expression
        this.ternary = 0; // Ternary expression
    }
}
exports.StructuralCpx = StructuralCpx;
