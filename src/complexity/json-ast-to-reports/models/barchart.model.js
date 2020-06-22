"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barchart = void 0;
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const chart_color_enum_1 = require("../enums/chart-color.enum");
const options_model_1 = require("../../core/models/options.model");
/**
 * Barchart of complexities
 */
class Barchart {
    constructor(cpxType) {
        this.data = []; // The data of the chart
        this.cpxType = cpxType;
    }
    /**
     * Increases the height of a bar with a given complexity
     * @param complexity / The x abscissa
     * @param quantity / The y value to add for the bar with x abscissa
     */
    addResult(complexity, quantity = 1) {
        const roundedCpx = Math.round(complexity);
        if (this.abscissaAlreadyExists(roundedCpx)) {
            this.increaseOrdinate(roundedCpx, quantity);
        }
        else {
            this.newBar(roundedCpx, quantity);
        }
        return this;
    }
    /**
     * Checks if a bar exists on a given abscissa
     * @param complexity / The abscissa value
     */
    abscissaAlreadyExists(complexity) {
        return this.data.map(p => p.x).includes(complexity);
    }
    /**
     * Increases the height of an existing bar
     * @param abscissa / The abscissa of the bar (the complexity value)
     * @param quantity / The height to add at the bar
     */
    increaseOrdinate(abscissa, quantity = 1) {
        const index = this.data.findIndex(e => e.x === abscissa);
        this.data[index].y = this.data[index].y + quantity;
    }
    /**
     * Adds a bar for a given abscissa
     * @param complexity
     * @param quantity
     */
    newBar(complexity, quantity = 1) {
        this.data.push({ x: complexity, y: quantity, color: this.getColor(complexity) });
    }
    /**
     * Sorts the data by abscissa value (orders the complexities by ascending sort)
     */
    sort() {
        this.data = this.data.sort((A, B) => A.x - B.x);
        return this;
    }
    /**
     * Gets the color of a bar with a given abscissa
     * @param complexity / The abscissa of the bar
     */
    getColor(complexity) {
        let color = chart_color_enum_1.ChartColor.WARNING;
        const cpx = `${this.cpxType}Cpx`;
        if (complexity <= options_model_1.Options[cpx].warningThreshold) {
            color = chart_color_enum_1.ChartColor.CORRECT;
        }
        else if (complexity > options_model_1.Options[cpx].errorThreshold) {
            color = chart_color_enum_1.ChartColor.ERROR;
        }
        return color;
    }
    /**
     * Adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     * Returns the chart himself
     */
    plugChartHoles() {
        var _a;
        this.sort();
        const cpxMax = (_a = this.data[this.data.length - 1]) === null || _a === void 0 ? void 0 : _a.x;
        const cpxMin = this.cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE ? 0 : 1;
        for (let cpx = cpxMin; cpx < cpxMax; cpx++) {
            if (!this.data.find(e => e.x === cpx)) {
                this.addResult(cpx, 0);
            }
        }
        this.sort();
        return this;
    }
}
exports.Barchart = Barchart;
