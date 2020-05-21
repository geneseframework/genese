"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Number of elements by complexity status
 */
class RepartitionByStatus {
    constructor() {
        this.correct = 0; // Number of elements with status "correct"
        this.warning = 0; // Number of elements with status "warning"
        this.error = 0; // Number of elements with status "error"
    }
    /**
     * Adds other repartitionByStatus
     * @param repartitionByStatus
     */
    add(repartitionByStatus) {
        let newStatuses = new RepartitionByStatus();
        newStatuses.correct = this.correct + repartitionByStatus.correct;
        newStatuses.warning = this.warning + repartitionByStatus.warning;
        newStatuses.error = this.error + repartitionByStatus.error;
        return newStatuses;
    }
}
exports.RepartitionByStatus = RepartitionByStatus;
