export const cpxFactors = {
    aggregation: {
        arr: 1,                             // Array of arrays
        density: 0.05,                      // Accumulation of nodes on a same line of code
        logicDoorChange: 2,                 // a "or" after a "and" (or a "or" after a "and") without brackets
        logicDoorChangeWithBrackets: 1      // a "or" after a "and" (or a "or" after a "and") without brackets
    },
    nesting: {
        arr: 1,                             // Inside an array
        conditional: 0.5,                   // Inside a conditional
        loop: 0.5                           // Inside a loop
    },
    structural: {
        arr: 1,                             // "Array", "Set"
        asynchronicity: 1,                  // "Promise", "Observable"
        conditional: 1,                     // "if", "else", "else if", "switch", "catch", ternary expression, nullish coalescing
        declaration: 0.1,                   // Declaration of a Class, a Function, a Method, ...
        externalBinding: 3,                 // A "this" inside a method which not refers to the method context (its class)
        func: 1,                            // Usage of a function or method inside a block of code
        imp: 0.1,                           // Element imported from another file
        jump: 1,                            // "break", "continue"
        logicDoor: 1,                       // "and", "or", "not"
        loop: 1,                            // "for", "foreach", "while"
        basic: 0.1,                         // Any elementary node ("Identifier", "Parameter", "Block", ...)
        recursion: 3                        // Recursion or callback
    }
}

