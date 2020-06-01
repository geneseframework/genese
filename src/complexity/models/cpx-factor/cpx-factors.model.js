"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const tools_service_1 = require("../../services/tools.service");
const aggregation_cpx_model_1 = require("./aggregation-cpx.model");
const nesting_cpx_model_1 = require("./nesting-cpx.model");
const basic_cpx_model_1 = require("./basic-cpx.model");
const structural_cpx_model_1 = require("./structural-cpx.model");
class CpxFactors {
    constructor() {
        this.aggregation = new aggregation_cpx_model_1.AggregationCpx();
        this.basic = new basic_cpx_model_1.BasicCpx();
        this.nesting = new nesting_cpx_model_1.NestingCpx();
        this.structural = new structural_cpx_model_1.StructuralCpx();
    }
    get total() {
        var _a;
        let total = 0;
        for (const key of Object.keys(this)) {
            if (key !== 'nesting') {
                total += (_a = this[`total${tools_service_1.capitalize(key)}`]) !== null && _a !== void 0 ? _a : 0;
            }
        }
        return total;
    }
    get totalAggregation() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.AGGREGATION);
    }
    get totalBasic() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.BASIC);
    }
    get totalNesting() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.NESTING);
    }
    get totalStructural() {
        return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.STRUCTURAL);
    }
    totalByFactorCategory(key) {
        var _a;
        let total = 0;
        for (const keyFeature of Object.keys(this[key])) {
            total += (_a = this[key][keyFeature]) !== null && _a !== void 0 ? _a : 0;
        }
        return total;
    }
    add(cpxFactors) {
        return tools_service_1.addObjects(this, cpxFactors, CpxFactors);
    }
}
exports.CpxFactors = CpxFactors;
