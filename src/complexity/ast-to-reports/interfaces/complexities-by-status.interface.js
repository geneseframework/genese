"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexitiesByStatus = void 0;
const statuses_model_1 = require("../models/statuses.model");
/**
 * Repartition by status for each kind of complexity
 */
class ComplexitiesByStatus {
    constructor() {
        this.cognitive = new statuses_model_1.RepartitionByStatus(); // The repartition by status of the cognitive complexity
        this.cyclomatic = new statuses_model_1.RepartitionByStatus(); // The repartition by status of the cyclomatic complexity
    }
    /**
     * Adds other cognitive and cyclomatic complexities
     * @param cpxByStatus
     */
    add(cpxByStatus) {
        if (!cpxByStatus) {
            return new ComplexitiesByStatus();
        }
        const result = new ComplexitiesByStatus();
        result.cognitive = result.cognitive.add(cpxByStatus.cognitive);
        result.cyclomatic = result.cyclomatic.add(cpxByStatus.cyclomatic);
        return result;
    }
}
exports.ComplexitiesByStatus = ComplexitiesByStatus;
