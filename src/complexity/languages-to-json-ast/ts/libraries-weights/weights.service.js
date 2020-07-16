"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightsService = void 0;
const language_to_json_ast_1 = require("../../language-to-json-ast");
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
    static weightedMethods() {
        let methods = [];
        for (const library of Object.keys(language_to_json_ast_1.WEIGHTS)) {
            methods = methods.concat(Object.keys(language_to_json_ast_1.WEIGHTS[library]));
        }
        return methods;
    }
}
exports.WeightsService = WeightsService;
