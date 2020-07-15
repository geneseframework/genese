import { Weights } from './weights.interface';
import { WEIGHTS } from '../../language-to-json-ast';

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


    static weightedMethods(): string[] {
        let methods: string[] = [];
        for (const library of Object.keys(WEIGHTS)) {
            methods = methods.concat(Object.keys(WEIGHTS[library]));
        }
        return methods;
    }

}
