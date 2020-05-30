"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpx = {
    aggregation: {
        density: 0.05,
        logicDoorChange: 2,
        logicDoorChangeWithBrackets: 1 // a "or" after a "and" (or a "or" after a "and") without brackets
    },
    nesting: {
        arr: 1,
        conditional: 0.5,
        loop: 0.5 // Inside a loop
    },
    structural: {
        asynchronicity: 1,
        conditional: 1,
        declaration: 0.1,
        externalBinding: 3,
        func: 1,
        imp: 0.1,
        jump: 1,
        logicDoor: 1,
        loop: 1,
        node: 0.1,
        recursion: 3 // Recursion or callback
    }
};
