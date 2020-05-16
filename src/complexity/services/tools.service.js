"use strict";
exports.__esModule = true;
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.percent = function (numerator, denominator) {
        if (!denominator) {
            return 0;
        }
        return Math.round(numerator * 1000 / denominator) / 10;
    };
    return Tools;
}());
exports.Tools = Tools;
