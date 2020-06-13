"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_model_1 = require("../models/ast.model");
class PhpToJsonAstService {
    static convert(path) {
        const jsonAst = new ast_model_1.JsonAst();
        jsonAst.astFile.path = path;
        return jsonAst;
    }
}
exports.PhpToJsonAstService = PhpToJsonAstService;
