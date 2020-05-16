"use strict";
exports.__esModule = true;
var Statuses = /** @class */ (function () {
    function Statuses() {
        this.correct = 0;
        this.warning = 0;
        this.error = 0;
    }
    Statuses.prototype.add = function (statuses) {
        var newStatuses = new Statuses();
        newStatuses.correct = this.correct + statuses.correct;
        newStatuses.warning = this.warning + statuses.warning;
        newStatuses.error = this.error + statuses.error;
        return newStatuses;
    };
    return Statuses;
}());
exports.Statuses = Statuses;
