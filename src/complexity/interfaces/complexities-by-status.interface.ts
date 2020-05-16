import { Statuses } from '../models/statuses.model';
import { Addition } from './add.interface';

export class ComplexitiesByStatus implements Addition<ComplexitiesByStatus> {

    cognitive?: Statuses = new Statuses();
    cyclomatic?: Statuses = new Statuses();

    add(cpxByStatus: ComplexitiesByStatus): ComplexitiesByStatus {
        if (!cpxByStatus) {
            return new ComplexitiesByStatus();
        }
        const result: ComplexitiesByStatus = new ComplexitiesByStatus();
        result.cognitive = result.cognitive.add(cpxByStatus.cognitive);
        result.cyclomatic = result.cyclomatic.add(cpxByStatus.cyclomatic);
        return result;
    }

}
