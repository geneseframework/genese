"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const barchart_model_1 = require("./barchart.model");
const complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
/**
 * The different statistics sent to handlebars templates of file reports and folder reports
 */
class Stats {
    constructor() {
        this.barChartCognitive = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.barChartCyclomatic = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.numberOfMethodsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        this.numberOfFiles = 0;
        this.numberOfMethods = 0;
        this.percentsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        this.subject = '';
        this.totalCognitiveComplexity = 0;
        this.totalCyclomaticComplexity = 0;
    }
    /**
     * Sets the percentages of cognitive and cyclomatic complexities spread by complexity status
     */
    setPercentages() {
        this.setPercentagesByComplexity(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.setPercentagesByComplexity(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    }
    /**
     * Sets the percentages of cognitive or cyclomatic complexity spread by complexity status
     */
    setPercentagesByComplexity(cpx) {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = new complexities_by_status_interface_1.ComplexitiesByStatus();
            this.percentsByStatus[cpx].correct = this.percent(this.numberOfMethodsByStatus[cpx].correct, this.numberOfMethods);
            this.percentsByStatus[cpx].warning = this.percent(this.numberOfMethodsByStatus[cpx].warning, this.numberOfMethods);
            this.percentsByStatus[cpx].error = this.percent(this.numberOfMethodsByStatus[cpx].error, this.numberOfMethods);
        }
    }
    /**
     * Returns the result of a fraction in percentage with 2 decimals
     * @param numerator         // The numerator of the fraction
     * @param denominator       // The denominator of the fraction
     */
    percent(numerator, denominator) {
        if (!denominator) {
            return 0;
        }
        return Math.round(numerator * 1000 / denominator) / 10;
    }
    /**
     * For each complexity chart, adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     */
    plugChartHoles() {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    }
    /**
     * Gets the sum of complexities for each barchart
     */
    cumulateComplexities() {
        this.totalCognitiveComplexity = this.barChartCognitive.getSumOfComplexities();
        this.totalCyclomaticComplexity = this.barChartCyclomatic.getSumOfComplexities();
    }
}
exports.Stats = Stats;
