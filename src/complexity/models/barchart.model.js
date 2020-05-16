"use strict";
exports.__esModule = true;
var options_1 = require("./options");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var colors_enum_1 = require("../enums/colors.enum");
var Barchart = /** @class */ (function () {
    function Barchart(cpxType) {
        this.data = [];
        this.cpxType = cpxType;
    }
    Barchart.prototype.addResult = function (complexity, quantity) {
        if (quantity === void 0) { quantity = 1; }
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity, quantity);
        }
        else {
            this.newBar(complexity, quantity);
        }
        return this;
    };
    Barchart.prototype.abscissaAlreadyExists = function (complexity) {
        return this.data.map(function (p) { return p.x; }).includes(complexity);
    };
    Barchart.prototype.increaseOrdinate = function (abscissa, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var index = this.data.findIndex(function (e) { return e.x === abscissa; });
        this.data[index].y = this.data[index].y + quantity;
    };
    Barchart.prototype.newBar = function (complexity, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.data.push({ x: complexity, y: quantity, color: this.getColor(complexity) });
    };
    Barchart.prototype.sort = function () {
        this.data = this.data.sort(function (A, B) { return A.x - B.x; });
        return this;
    };
    Barchart.prototype.getColor = function (complexity) {
        var color = colors_enum_1.ChartColor.WARNING;
        var cpx = this.cpxType + "Cpx";
        if (complexity <= options_1.Options[cpx].warningThreshold) {
            color = colors_enum_1.ChartColor.CORRECT;
        }
        else if (complexity > options_1.Options[cpx].errorThreshold) {
            color = colors_enum_1.ChartColor.ERROR;
        }
        return color;
    };
    Barchart.prototype.plugChartHoles = function () {
        var _a;
        this.sort();
        var cpxMax = (_a = this.data[this.data.length - 1]) === null || _a === void 0 ? void 0 : _a.x;
        var cpxMin = this.cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE ? 0 : 1;
        var _loop_1 = function (cpx) {
            if (!this_1.data.find(function (e) { return e.x === cpx; })) {
                this_1.addResult(cpx, 0);
            }
        };
        var this_1 = this;
        for (var cpx = cpxMin; cpx < cpxMax; cpx++) {
            _loop_1(cpx);
        }
        this.sort();
        return this;
    };
    return Barchart;
}());
exports.Barchart = Barchart;
