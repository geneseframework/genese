import { CpxFactors } from './models/cpx-factor/cpx-factors.model';

const complexityFactors: CpxFactors = new CpxFactors();


complexityFactors.aggregation = {
    arr: 1,                             // Array of arrays
    density: 0.05,                      // Accumulation of nodes on a same line of code
    logicDoorChange: 2,                 // a "or" after a "and" (or a "or" after a "and") without brackets
    logicDoorChangeWithBrackets: 1      // a "or" after a "and" (or a "or" after a "and") without brackets
};
complexityFactors.basic = {
    declaration: 0.1,                   // Declaration of a Class, a Function, a Method, ...
    imp: 0.1,                           // Element imported from another file
    node: 0.1,                          // Any AST node ("Identifier", "Parameter", "Block", IfStatement, ...)
};
complexityFactors.nesting = {
    // arr: 1,                             // Inside an array
    conditional: 0.5,                   // Inside a conditional
    func: 1,                            // Usage of a function or method inside a block of code
    loop: 0.5                           // Inside a loop
};
complexityFactors.structural = {
    arr: 1,                             // "Array", "Set"
    asynchronicity: 1,                  // "Promise", "Observable"
    conditional: 1,                     // "if", "else", "else if", "switch", "catch", ternary expression, nullish coalescing
    externalBinding: 3,                 // A "this" inside a method which not refers to the method context (its class)
    func: 1,                            // Usage of a function or method inside a block of code
    jump: 1,                            // "break", "continue"
    logicDoor: 1,                       // "and", "or", "not"
    loop: 1,                            // "for", "foreach", "while"
    recursion: 3,                       // Recursion or callback
    regex: 1                            // Regular expression
};

export const cpxFactors: CpxFactors = complexityFactors;
