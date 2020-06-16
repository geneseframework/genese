"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = void 0;
const ansi_colors_1 = require("ansi-colors");
const init_conversion_service_1 = require("./services/init-conversion.service");
const json_ast_model_1 = require("../../ast-to-reports/models/ast/json-ast.model");
const language_enum_1 = require("../../ast-to-reports/enums/language.enum");
/**
 * MainConvertTs process of the analysis
 */
class MainConvertTs {
    /**
     * Starts the conversion
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param language
     */
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs, language) {
        console.log('START CONVERSION FROM TS TO JSON');
        // ConvertOptions.se
        const jsonAst = new json_ast_model_1.JsonAst();
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                jsonAst.astFolder = initService.generateTree(pathToAnalyze);
                console.log('JSONASTTTT', jsonAst);
        }
        console.log(ansi_colors_1.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
