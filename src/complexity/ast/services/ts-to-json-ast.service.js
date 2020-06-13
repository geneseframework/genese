"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_model_1 = require("../models/ast.model");
class TsToJsonAstService {
    static convert(sourceFile) {
        const debug = './src/complexity/mocks/debug.mock.ts';
        const jsonAst = new ast_model_1.JsonAst();
        jsonAst.astFile.path = debug;
        return jsonAst;
    }
}
exports.TsToJsonAstService = TsToJsonAstService;
