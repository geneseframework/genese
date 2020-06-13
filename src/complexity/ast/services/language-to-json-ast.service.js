"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_enum_1 = require("../enums/language.enum");
const ts_to_json_ast_service_1 = require("./ts-to-json-ast.service");
const ast_service_1 = require("../../services/ast.service");
class LanguageToJsonAstService {
    static convert(path, language) {
        switch (language) {
            case language_enum_1.Language.TS:
            case language_enum_1.Language.TYPESCRIPT:
                return ts_to_json_ast_service_1.TsToJsonAstService.convert(ast_service_1.Ast.getSourceFile(path));
            default:
                console.error('Unknown language ', language);
                return undefined;
        }
    }
}
exports.LanguageToJsonAstService = LanguageToJsonAstService;
