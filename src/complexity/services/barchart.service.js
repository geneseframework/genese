"use strict";
exports.__esModule = true;
var BarchartService = /** @class */ (function () {
    function BarchartService() {
    }
    BarchartService.concat = function (chart1, chart2) {
        if (!chart2) {
            return chart1;
        }
        for (var _i = 0, _a = chart2.data; _i < _a.length; _i++) {
            var point = _a[_i];
            chart1 = chart1.addResult(point.x, point.y);
        }
        return chart1;
    };
    return BarchartService;
}());
exports.BarchartService = BarchartService;
