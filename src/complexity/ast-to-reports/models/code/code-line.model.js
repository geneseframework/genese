"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLine = void 0;
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const nesting_cpx_model_1 = require("../cpx-factor/nesting-cpx.model");
const depth_cpx_model_1 = require("../cpx-factor/depth-cpx.model");
const tools_service_1 = require("../../../core/services/tools.service");
class CodeLine {
    constructor() {
        this.astNodes = []; // The array of AstNodes corresponding to AST nodes in this line of code
        this.cpxFactors = new cpx_factors_model_1.CpxFactors(); // The complexity factors relative to this line (breakFlows, increments,...)
        this.issue = 0; // The number of the line in its Code parentFunction (method)
        this.position = 0; // The position (in number of characters) of the start of the line
        this.text = ''; // The text of the line
    }
    /**
     * Checks if a line is commented
     */
    get isCommented() {
        return this.text.trim().slice(0, 2) === `//` || this.text.trim().slice(0, 2) === `/*`;
    }
    /**
     * Sets the depth and nesting complexity to this CodeLine
     */
    setDepthAndNestingCpx() {
        var _a, _b, _c, _d, _e;
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        this.cpxFactors.depth = new depth_cpx_model_1.DepthCpx();
        for (const astNode of this.astNodes) {
            if (astNode.intrinsicNestingCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.depth);
                this.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_c = (_b = astNode.parent) === null || _b === void 0 ? void 0 : _b.cpxFactors) === null || _c === void 0 ? void 0 : _c.nesting);
            }
            if (astNode.intrinsicDepthCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_e = (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth);
            }
        }
    }
}
exports.CodeLine = CodeLine;
