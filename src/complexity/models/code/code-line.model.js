"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const nesting_cpx_model_1 = require("../cpx-factor/nesting-cpx.model");
const tools_service_1 = require("../../services/tools.service");
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
    setNestingCpx() {
        var _a, _b, _c, _d;
        let nestingCpx = 0;
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        for (const treeNode of this.treeNodes) {
            // console.log('KIND', Ast.getType(treeNode.node), 'NESTING', treeNode.cpxFactors.totalNesting, 'INTRS NEST', treeNode.intrinsicNestingCpx, 'FEATURE', treeNode.feature)
            if (treeNode.intrinsicNestingCpx > 0) {
                nestingCpx += (_b = (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.cpxFactors) === null || _b === void 0 ? void 0 : _b.totalNesting;
                this.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_d = (_c = treeNode.parent) === null || _c === void 0 ? void 0 : _c.cpxFactors) === null || _d === void 0 ? void 0 : _d.nesting);
            }
        }
        return nestingCpx;
    }
}
exports.CodeLine = CodeLine;
