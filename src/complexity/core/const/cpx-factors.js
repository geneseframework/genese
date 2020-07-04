"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpxFactors = void 0;
const cpx_factors_model_1 = require("../models/cpx-factor/cpx-factors.model");
const complexityFactors = new cpx_factors_model_1.CpxFactors();
complexityFactors.aggregation = {
    arr: 1,
    density: 0.05,
    differentLogicDoor: 2,
    regex: 0.1 // Each element in a regex
};
complexityFactors.atomic = {
    declaration: 0,
    empty: 0,
    keyword: 0.1,
    literal: 0.1,
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
complexityFactors.recursion = {
    callback: 2,
    recursivity: 3 // Recursive method (call to the node's method)
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
    regex: 1,
    ternary: 1 // Ternary expression
};
exports.cpxFactors = complexityFactors;
