"use strict";
exports.__esModule = true;
var stats_model_1 = require("../models/stats.model");
var StatsService = /** @class */ (function () {
    function StatsService() {
        this._stats = undefined;
    }
    StatsService.prototype.getStats = function (fileOrFolder) {
        if (this._stats) {
            return this._stats;
        }
        else {
            this._stats = new stats_model_1.Stats();
            this.calculateStats(fileOrFolder);
            this.getSubject();
            this._stats.setPercentages();
            this._stats.cumulateComplexities();
            this.sortBarCharts();
            return this._stats.plugChartHoles();
        }
    };
    StatsService.prototype.sortBarCharts = function () {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    };
    return StatsService;
}());
exports.StatsService = StatsService;
