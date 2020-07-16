"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightsService = void 0;
const globals_const_1 = require("../../globals.const");
/**
 * Manages the custom Node weights added with libraries-weights Json files
 */
class WeightsService {
    /**
     * Merges the libraries-weights Json files
     */
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
    /**
     * Returns the names of the methods included in the libraries-weights Json files
     */
    static weightedMethods() {
        let methods = [];
        for (const library of Object.keys(globals_const_1.WEIGHTS)) {
            methods = methods.concat(Object.keys(globals_const_1.WEIGHTS[library]));
        }
        return methods;
    }
}
exports.WeightsService = WeightsService;
