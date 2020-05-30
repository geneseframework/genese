export enum StructuralComplexity {

    ASYNCHRONICITY = 1,     // "Promise", "Observable"
    CONDITIONAL = 1,        // "if", "else", "else if", "switch", "catch", ternary expression, nullish coalescing
    DECLARATION = 0.1,      // Declaration of a Class, a Function, a Method, ...
    EXTERNAL_BINDING = 3,   // A "this" inside a method which not refers to the method context (its class)
    FUNCTION = 1,           // Usage of a function or method inside a block of code
    IMPORT = 0.1,           // Element imported from another file
    JUMP = 1,               // "break", "continue"
    LOGIC_DOOR = 1,         // "and", "or"
    LOOP = 1,               // "for", "foreach", "while"
    NODE = 0.1,             // Any AST node ("Identifier", "Parameter", "IfStatement", "Block", "CallExpression", ...)
    RECURSION = 3,          // Recursion or callback

}
