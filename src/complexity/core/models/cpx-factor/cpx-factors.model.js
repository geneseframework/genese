"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpxFactors = void 0;
const factor_category_enum_1 = require("../../../json-ast-to-reports/enums/factor-category.enum");
const tools_service_1 = require("../../services/tools.service");
const aggregation_cpx_model_1 = require("./aggregation-cpx.model");
const nesting_cpx_model_1 = require("./nesting-cpx.model");
const atomic_cpx_model_1 = require("./atomic-cpx.model");
const structural_cpx_model_1 = require("./structural-cpx.model");
const depth_cpx_model_1 = require("./depth-cpx.model");
const context_cpx_model_1 = require("./context-cpx.model");
const recursion_cpx_model_1 = require("./recursion-cpx.model");
const use_cpx_model_1 = require("./use-cpx.model");
/**
 * The Complexity Factors
 */
class CpxFactors {
    constructor() {
        this.aggregation = new aggregation_cpx_model_1.AggregationCpx(); // Aggregation Complexity
        this.atomic = new atomic_cpx_model_1.AtomicCpx(); // Atomic Complexity
        this.context = new context_cpx_model_1.ContextCpx(); // Context Complexity
        this.depth = new depth_cpx_model_1.DepthCpx(); // Depth Complexity
        this.nesting = new nesting_cpx_model_1.NestingCpx(); // Nesting Complexity
        this.recursion = new recursion_cpx_model_1.RecursionCpx(); // Recursion Complexity
        this.structural = new structural_cpx_model_1.StructuralCpx(); // Structural Complexity
        this.use = new use_cpx_model_1.UseCpx(); // Use Complexity
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    /**
     * Returns the total of Complexity Factors (the Complexity Index)
     */
    get total() {
        var _a;
        let total = 0;
        for (const key of Object.keys(this)) {
            total += (_a = this[`total${tools_service_1.capitalize(key)}`]) !== null && _a !== void 0 ? _a : 0;
        }
        return +total.toFixed(1);
    }
    get totalAggregation() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.AGGREGATION);
    }
    get totalAtomic() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.ATOMIC);
    }
    get totalDepth() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.DEPTH);
    }
    get totalNesting() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.NESTING);
    }
    get totalRecursion() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.RECURSION);
    }
    get totalStructural() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.STRUCTURAL);
    }
    get totalUse() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.USE);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Returns the total Complexity Index for a given Category of Factors
     * @param factorCategory
     */
    totalByFactorCategory(factorCategory) {
        var _a;
        let total = 0;
        for (const keyFeature of Object.keys(this[factorCategory])) {
            total += (_a = this[factorCategory][keyFeature]) !== null && _a !== void 0 ? _a : 0;
        }
        return total;
    }
    /**
     * Adds a CpxFactors object to another one
     * @param cpxFactors
     */
    add(cpxFactors) {
        return tools_service_1.addObjects(this, cpxFactors, CpxFactors);
    }
}
exports.CpxFactors = CpxFactors;
