import { Barchart } from './barchart.model';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';

/**
 * The different statistics sent to handlebars templates of file reports and folder reports
 */
export class Stats {

    barChartCognitive?: Barchart = new Barchart(ComplexityType.COGNITIVE);          // Bar chart of cognitive complexity
    barChartCyclomatic?: Barchart = new Barchart(ComplexityType.CYCLOMATIC);        // Bar chart of cyclomatic complexity
    numberOfMethodsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();    // Number of methods spread by status
    numberOfFiles ?= 0;                                                             // Number of files of the report (if it's a folder report)
    numberOfMethods ?= 0;                                                           // Number of methods of the report
    percentsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();           // Percentages of repartition by complexity status
    subject ?= '';                                                                  // The subject of the analysis (file or folder)
    totalCognitiveComplexity ?= 0;                                                  // Total of cognitive complexity scores
    totalCyclomaticComplexity ?= 0;                                                 // Total of cyclomatic complexity scores


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
