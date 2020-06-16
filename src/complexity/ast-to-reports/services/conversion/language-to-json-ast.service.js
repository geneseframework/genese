"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageToJsonAstService = void 0;
const language_enum_1 = require("../../../core/enum/language.enum");
const php_to_json_ast_service_1 = require("./php-to-json-ast.service");
class LanguageToJsonAstService {
    static convert(path, language) {
        switch (language) {
            case language_enum_1.Language.PHP:
                return php_to_json_ast_service_1.PhpToJsonAstService.convert(path);
            default:
                console.error('Unknown language ', language);
                return undefined;
        }
    }
}
exports.LanguageToJsonAstService = LanguageToJsonAstService;
