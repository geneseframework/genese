"use strict";
exports.__esModule = true;
var statuses_model_1 = require("../models/statuses.model");
var ComplexitiesByStatus = /** @class */ (function () {
    function ComplexitiesByStatus() {
        this.cognitive = new statuses_model_1.Statuses();
        this.cyclomatic = new statuses_model_1.Statuses();
    }
    ComplexitiesByStatus.prototype.add = function (cpxByStatus) {
        if (!cpxByStatus) {
            return new ComplexitiesByStatus();
        }
        var result = new ComplexitiesByStatus();
        result.cognitive = result.cognitive.add(cpxByStatus.cognitive);
        result.cyclomatic = result.cyclomatic.add(cpxByStatus.cyclomatic);
        return result;
    };
    return ComplexitiesByStatus;
}());
exports.ComplexitiesByStatus = ComplexitiesByStatus;
