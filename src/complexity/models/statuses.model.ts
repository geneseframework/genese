import { Addition } from '../interfaces/add.interface';

/**
 * Number of methods by complexity status
 */
export class RepartitionByStatus implements Addition<RepartitionByStatus>{

    correct ?= 0;
    warning ?= 0;
    error ?= 0;


    /**
     * Adds other repartitionByStatus
     * @param repartitionByStatus
     */
    add(repartitionByStatus: RepartitionByStatus): RepartitionByStatus {
        let newStatuses = new RepartitionByStatus();
        newStatuses.correct = this.correct + repartitionByStatus.correct;
        newStatuses.warning = this.warning + repartitionByStatus.warning;
        newStatuses.error = this.error + repartitionByStatus.error;
        return newStatuses;
    }
}
