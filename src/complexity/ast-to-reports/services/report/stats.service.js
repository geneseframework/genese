"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const stats_model_1 = require("../../models/stats.model");
/**
 * Abstract class managing statistics of files or folders
 */
class StatsService {
    constructor() {
        this._stats = undefined; // The statistics of the AstFile or the AstFolder
    }
    /**
     * Calculates and returns all the statistics
     * @param fileOrFolder      // The file or folder to analyse
     */
    getStats(fileOrFolder) {
        if (this._stats) {
            return this._stats;
        }
        else {
            this._stats = new stats_model_1.Stats();
            this.calculateStats(fileOrFolder);
            this.getNameOrPath(fileOrFolder);
            this._stats.setPercentages();
            this._stats.totalCognitiveComplexity = fileOrFolder.cpxFactors.total;
            this._stats.totalCyclomaticComplexity = fileOrFolder.cyclomaticCpx;
            this.sortBarCharts();
            return this._stats.plugChartHoles();
        }
    }
    /**
     * Sorts the barCharts by increasing complexity
     */
    sortBarCharts() {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    }
}
exports.StatsService = StatsService;
