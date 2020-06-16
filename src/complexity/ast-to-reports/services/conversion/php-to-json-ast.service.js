"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpToJsonAstService = void 0;
const json_ast_model_1 = require("../../../core/models/json-ast.model");
class PhpToJsonAstService {
    static convert(path) {
        const jsonAst = new json_ast_model_1.JsonAst();
        return jsonAst;
    }
}
exports.PhpToJsonAstService = PhpToJsonAstService;
