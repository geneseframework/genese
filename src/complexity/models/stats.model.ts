import { Barchart } from './barchart.model';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';

/**
 * The different statistics sent to handlebars templates of file reports and folder reports
 */
export class Stats {

    barChartCognitive?: Barchart = new Barchart(ComplexityType.COGNITIVE);
    barChartCyclomatic?: Barchart = new Barchart(ComplexityType.CYCLOMATIC);
    numberOfMethodsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    percentsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    subject ?= '';
    totalCognitiveComplexity ?= 0;
    totalCyclomaticComplexity ?= 0;


    /**
     * Sets the percentages of cognitive and cyclomatic complexities spread by complexity status
     */
    setPercentages(): void {
        this.setPercentagesByComplexity(ComplexityType.COGNITIVE);
        this.setPercentagesByComplexity(ComplexityType.CYCLOMATIC);
    }


    /**
     * Sets the percentages of cognitive or cyclomatic complexity spread by complexity status
     */
    setPercentagesByComplexity(cpx: ComplexityType): void {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = new ComplexitiesByStatus();
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
    percent(numerator: number, denominator: number): number {
        if (!denominator) {
            return 0;
        }
        return  Math.round(numerator * 1000 / denominator) / 10;
    }


    /**
     * For each complexity chart, adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     */
    plugChartHoles(): Stats {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    }


    /**
     * Gets the sum of complexities for each barchart
     */
    cumulateComplexities(): void {
        this.totalCognitiveComplexity = this.barChartCognitive.getSumOfComplexities();
        this.totalCyclomaticComplexity = this.barChartCyclomatic.getSumOfComplexities();
    }
}
