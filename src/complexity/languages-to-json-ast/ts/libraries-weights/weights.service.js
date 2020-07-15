"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightsService = void 0;
class WeightsService {
    static merge() {
        try {
            const index = require('./index.json');
            const weights = {};
            for (const library of Object.keys(index)) {
                weights[library] = require(index[library]);
            }
            return weights;
        }
        catch (err) {
            throw Error('Error merging libraries-weights : please verify paths in index.json and libraries-weights Json format');
        }
    }
}
exports.WeightsService = WeightsService;
