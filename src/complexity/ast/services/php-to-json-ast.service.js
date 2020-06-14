"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ast_model_1 = require("../models/json-ast.model");
class PhpToJsonAstService {
    static convert(path) {
        const jsonAst = new json_ast_model_1.JsonAst();
        return jsonAst;
    }
}
exports.PhpToJsonAstService = PhpToJsonAstService;
