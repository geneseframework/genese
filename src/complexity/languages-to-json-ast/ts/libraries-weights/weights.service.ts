import { Weights } from './weights.interface';

export class WeightsService {

    static merge(): Weights {
        try {
            const index = require('./index.json');
            const weights: Weights = {};
            for (const library of Object.keys(index)) {
                weights[library] = require(index[library]);
            }
            return weights;
        } catch (err) {
            throw Error('Error merging libraries-weights : please verify paths in index.json and libraries-weights Json format');
        }
    }

}
