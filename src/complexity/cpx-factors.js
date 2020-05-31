"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("./models/cpx-factors.model");
const complexityFactors = new cpx_factors_model_1.CpxFactors();
complexityFactors.aggregation = {
    arr: 1,
    density: 0.05,
    logicDoorChange: 2,
    logicDoorChangeWithBrackets: 1 // a "or" after a "and" (or a "or" after a "and") without brackets
};
complexityFactors.basic = {
    declaration: 0.1,
    imp: 0.1,
    node: 0.1,
};
complexityFactors.nesting = {
    arr: 1,
    conditional: 0.5,
    loop: 0.5 // Inside a loop
};
complexityFactors.structural = {
    arr: 1,
    asynchronicity: 1,
    conditional: 1,
    externalBinding: 3,
    func: 1,
    jump: 1,
    logicDoor: 1,
    loop: 1,
    recursion: 3 // Recursion or callback
};
exports.cpxFactors = complexityFactors;
