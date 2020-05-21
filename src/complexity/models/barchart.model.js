"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const colors_enum_1 = require("../enums/colors.enum");
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
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity, quantity);
        }
        else {
            this.newBar(complexity, quantity);
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
        let color = colors_enum_1.ChartColor.WARNING;
        const cpx = `${this.cpxType}Cpx`;
        if (complexity <= options_1.Options[cpx].warningThreshold) {
            color = colors_enum_1.ChartColor.CORRECT;
        }
        else if (complexity > options_1.Options[cpx].errorThreshold) {
            color = colors_enum_1.ChartColor.ERROR;
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
    /**
     * Gets the sum of complexities of this barchart
     */
    getSumOfComplexities() {
        var _a;
        if (!((_a = this.data) === null || _a === void 0 ? void 0 : _a.length)) {
            return 0;
        }
        return this.data.map(e => e.x * e.y).reduce((total, current) => total + current);
    }
}
exports.Barchart = Barchart;
