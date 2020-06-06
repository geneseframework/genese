"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const nesting_cpx_model_1 = require("../cpx-factor/nesting-cpx.model");
const tools_service_1 = require("../../services/tools.service");
const depth_cpx_model_1 = require("../cpx-factor/depth-cpx.model");
/**
 * A line of a Code object
 */
class CodeLine {
    constructor() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors(); // The complexity factors relative to this line (breakFlows, increments,...)
        this.issue = 0; // The number of the line in its Code context (method)
        this.position = 0; // The position (in number of characters) of the start of the line
        this.text = ''; // The text of the line
        this.treeNodes = [];
    }
    /**
     * Sets the nesting complexity to this CodeLine
     */
    setDepthAndNestingCpx() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let nestingCpx = 0;
        let depthCpx = 0;
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        this.cpxFactors.depth = new depth_cpx_model_1.DepthCpx();
        for (const treeNode of this.treeNodes) {
            if (treeNode.intrinsicNestingCpx > 0) {
                nestingCpx += (_b = (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.cpxFactors) === null || _b === void 0 ? void 0 : _b.totalNesting;
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_d = (_c = treeNode.parent) === null || _c === void 0 ? void 0 : _c.cpxFactors) === null || _d === void 0 ? void 0 : _d.depth);
                this.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_f = (_e = treeNode.parent) === null || _e === void 0 ? void 0 : _e.cpxFactors) === null || _f === void 0 ? void 0 : _f.nesting);
            }
            if (treeNode.intrinsicDepthCpx > 0) {
                depthCpx += (_h = (_g = treeNode.parent) === null || _g === void 0 ? void 0 : _g.cpxFactors) === null || _h === void 0 ? void 0 : _h.totalDepth;
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_k = (_j = treeNode.parent) === null || _j === void 0 ? void 0 : _j.cpxFactors) === null || _k === void 0 ? void 0 : _k.depth);
            }
        }
        return nestingCpx;
    }
}
exports.CodeLine = CodeLine;
