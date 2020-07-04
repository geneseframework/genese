import { CpxFactors } from '../models/cpx-factor/cpx-factors.model';

const complexityFactors: CpxFactors = new CpxFactors();


complexityFactors.aggregation = {
    arr: 1,                             // Array of arrays
    density: 0.05,                      // Accumulation of nodes on a same line of code
    differentLogicDoor: 2,              // a "or" after a "and" (or a "or" after a "and") without brackets
    regex: 0.1                          // each element in a regex
};
complexityFactors.atomic = {
    declaration: 0,
    empty: 0,
    keyword: 0.1,
    literal: 0.1,
    node: 0.1,                          // Any AST node ("Identifier", "Parameter", "Block", IfStatement, ...)
};
complexityFactors.depth = {
    arr: 1.5,                           // Depth of elements inside an array
};
complexityFactors.nesting = {
    conditional: 0.5,                   // Inside a conditional
    func: 1,                            // Usage of a function or method inside a block of code
    loop: 0.5,                          // Inside a loop
    ternary: 2                          // Ternaries inside other ternaries
};
complexityFactors.recursion = {
    callback: 2,                          // Callback (call to a parameter of the parentFunction (ie method) of the node)
    recursivity: 3                      // Recursive method (call to the node's method)
};
complexityFactors.structural = {
    arr: 0.1,                           // "Array", "Set"
    asynchronicity: 1,                  // "Promise", "Observable"
    conditional: 1,                     // "if", "else", "else if", "switch", "catch", nullish coalescing
    externalBinding: 3,                 // A "this" inside a method which not refers to the method parentFunction (its class)
    func: 1,                            // Usage of a function or method inside a block of code
    jump: 1,                            // "break", "continue"
    logicDoor: 1,                       // "and", "or", "not"
    loop: 1,                            // "for", "foreach", "while"
    regex: 1,                           // Regular expression
    ternary: 1                          // Ternary expression
};

export const cpxFactors: CpxFactors = complexityFactors;
