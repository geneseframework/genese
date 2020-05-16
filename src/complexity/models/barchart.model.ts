import { Bar } from './bar.model';
import { Options } from './options';
import { ComplexityType } from '../enums/complexity-type.enum';
import { ChartColor } from '../enums/colors.enum';

export class Barchart {

    data?: Bar[] = [];
    cpxType?: ComplexityType;

    constructor(cpxType?: ComplexityType) {
        this.cpxType = cpxType;
    }

    addResult(complexity: number, quantity = 1): Barchart {
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity, quantity);
        } else {
            this.newBar(complexity, quantity);
        }
        return this;
    }


    abscissaAlreadyExists(complexity: number): boolean {
        return this.data.map(p => p.x).includes(complexity);
    }


    increaseOrdinate(abscissa: number, quantity = 1): void {
        const index = this.data.findIndex(e => e.x === abscissa);
        this.data[index].y = this.data[index].y + quantity;
    }


    newBar(complexity: number, quantity = 1): void {
        this.data.push({x: complexity, y: quantity, color: this.getColor(complexity)});
    }


    sort(): Barchart {
        this.data = this.data.sort((A, B) => A.x - B.x);
        return this;
    }


    getColor(complexity: number): ChartColor {
        let color = ChartColor.WARNING;
        const cpx = `${this.cpxType}Cpx`;
        if (complexity <= Options[cpx].warningThreshold) {
            color = ChartColor.CORRECT;
        } else if (complexity > Options[cpx].errorThreshold) {
            color = ChartColor.ERROR;
        }
        return color;
    }


    plugChartHoles(): Barchart {
        this.sort();
        const cpxMax: number = this.data[this.data.length - 1]?.x;
        const cpxMin: number = this.cpxType === ComplexityType.COGNITIVE ? 0 : 1;
        for (let cpx = cpxMin; cpx < cpxMax; cpx++) {
            if (!this.data.find(e => e.x === cpx)) {
                this.addResult(cpx, 0);
            }
        }
        this.sort();
        return this;
    }

}

