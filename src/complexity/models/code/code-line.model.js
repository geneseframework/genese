"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const nesting_cpx_model_1 = require("../cpx-factor/nesting-cpx.model");
/**
 * A line of a Code object
 */
class CodeLine {
    constructor() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors(); // The complexity factors relative to this line (breakFlows, increments,...)
        this.issue = 0; // The number of the line in its Code context (method)
        this.position = 0; // The position (in number of characters) of the start of the line
        this.text = ''; // The text of the line
    }
    setNestingCpx() {
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        // this.cpxFactors.nesting.conditional = 1;
    }
}
exports.CodeLine = CodeLine;
