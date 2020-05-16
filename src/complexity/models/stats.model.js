"use strict";
exports.__esModule = true;
var barchart_model_1 = require("./barchart.model");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var tools_service_1 = require("../services/tools.service");
var Stats = /** @class */ (function () {
    function Stats() {
        this.barChartCognitive = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.barChartCyclomatic = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.numberOfMethodsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        this.numberOfFiles = 0;
        this.numberOfMethods = 0;
        this.percentsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        this.subject = '';
        this.totalCognitiveComplexity = 0;
        // totalComplexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
        this.totalCyclomaticComplexity = 0;
    }
    Stats.prototype.addPercentages = function () {
        this.addPercentagesByComplexity(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.addPercentagesByComplexity(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    };
    Stats.prototype.addPercentagesByComplexity = function (cpx) {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = new complexities_by_status_interface_1.ComplexitiesByStatus();
            this.percentsByStatus[cpx].correct = tools_service_1.Tools.percent(this.numberOfMethodsByStatus[cpx].correct, this.numberOfMethods);
            this.percentsByStatus[cpx].warning = tools_service_1.Tools.percent(this.numberOfMethodsByStatus[cpx].warning, this.numberOfMethods);
            this.percentsByStatus[cpx].error = tools_service_1.Tools.percent(this.numberOfMethodsByStatus[cpx].error, this.numberOfMethods);
        }
    };
    Stats.prototype.plugChartHoles = function () {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    };
    Stats.prototype.cumulateComplexities = function () {
        this.totalCognitiveComplexity = this.cumulateComplexitiesByChart(this.barChartCognitive.data);
        this.totalCyclomaticComplexity = this.cumulateComplexitiesByChart(this.barChartCyclomatic.data);
    };
    Stats.prototype.cumulateComplexitiesByChart = function (data) {
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            return 0;
        }
        return data.map(function (e) { return e.x * e.y; }).reduce(function (total, current) { return total + current; });
    };
    return Stats;
}());
exports.Stats = Stats;
