"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarchartService = void 0;
/**
 * Service for BarCharts
 */
class BarchartService {
    /**
     * Merge two BarCharts
     * @param chart1
     * @param chart2
     */
    static concat(chart1, chart2) {
        if (!chart2) {
            return chart1;
        }
        for (const bar of chart2.data) {
            chart1 = chart1.addResult(bar.x, bar.y);
        }
        return chart1;
    }
}
exports.BarchartService = BarchartService;
