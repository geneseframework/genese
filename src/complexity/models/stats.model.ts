import { Barchart } from './barchart.model';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Tools } from '../services/tools.service';
import { Bar } from '../interfaces/bar.interface';

export class Stats {

    barChartCognitive?: Barchart = new Barchart(ComplexityType.COGNITIVE);
    barChartCyclomatic?: Barchart = new Barchart(ComplexityType.CYCLOMATIC);
    numberOfMethodsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    percentsByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    subject ?= '';
    totalCognitiveComplexity ?= 0;
    // totalComplexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    totalCyclomaticComplexity ?= 0;


    addPercentages(): void {
        this.addPercentagesByComplexity(ComplexityType.COGNITIVE);
        this.addPercentagesByComplexity(ComplexityType.CYCLOMATIC);
    }


    addPercentagesByComplexity(cpx: ComplexityType): void {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = new ComplexitiesByStatus();
            this.percentsByStatus[cpx].correct = Tools.percent(this.numberOfMethodsByStatus[cpx].correct, this.numberOfMethods);
            this.percentsByStatus[cpx].warning = Tools.percent(this.numberOfMethodsByStatus[cpx].warning, this.numberOfMethods);
            this.percentsByStatus[cpx].error = Tools.percent(this.numberOfMethodsByStatus[cpx].error, this.numberOfMethods);
        }
    }


    plugChartHoles(): Stats {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    }


    cumulateComplexities(): void {
        this.totalCognitiveComplexity = this.cumulateComplexitiesByChart(this.barChartCognitive.data);
        this.totalCyclomaticComplexity = this.cumulateComplexitiesByChart(this.barChartCyclomatic.data);
    }


    cumulateComplexitiesByChart(data: Bar[]): number {
        if (!data?.length) {
            return 0;
        }
        return data.map(e => e.x * e.y).reduce((total, current)  =>  total + current);
    }
}
