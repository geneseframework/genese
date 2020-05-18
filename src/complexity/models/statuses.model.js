"use strict";
exports.__esModule = true;
/**
 * Number of methods by complexity status
 */
var RepartitionByStatus = /** @class */ (function () {
    function RepartitionByStatus() {
        this.correct = 0;
        this.warning = 0;
        this.error = 0;
    }
    /**
     * Adds other repartitionByStatus
     * @param repartitionByStatus
     */
    RepartitionByStatus.prototype.add = function (repartitionByStatus) {
        var newStatuses = new RepartitionByStatus();
        newStatuses.correct = this.correct + repartitionByStatus.correct;
        newStatuses.warning = this.warning + repartitionByStatus.warning;
        newStatuses.error = this.error + repartitionByStatus.error;
        return newStatuses;
    };
    return RepartitionByStatus;
}());
exports.RepartitionByStatus = RepartitionByStatus;
