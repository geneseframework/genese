"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("./models/cpx-factor/cpx-factors.model");
const complexityFactors = new cpx_factors_model_1.CpxFactors();
complexityFactors.aggregation = {
    arr: 1,
    density: 0.05,
    differentLogicDoor: 2,
    regex: 0.1 // each element in a regex
};
complexityFactors.basic = {
    declaration: 0.1,
    imp: 0.1,
    node: 0.1,
};
complexityFactors.depth = {
    arr: 1.5,
};
complexityFactors.nesting = {
    conditional: 0.5,
    func: 1,
    loop: 0.5,
    ternary: 2 // Ternaries inside other ternaries
};
complexityFactors.structural = {
    arr: 0.1,
    asynchronicity: 1,
    conditional: 1,
    externalBinding: 3,
    func: 1,
    jump: 1,
    logicDoor: 1,
    loop: 1,
    recursion: 3,
    regex: 1,
    ternary: 1 // Ternary expression
};
exports.cpxFactors = complexityFactors;
