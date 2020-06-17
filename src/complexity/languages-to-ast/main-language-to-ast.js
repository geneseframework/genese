"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = exports.LIMIT_CONVERSIONS = void 0;
const ansi_colors_1 = require("ansi-colors");
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const convert_options_model_1 = require("./core/convert-options.model");
const json_ast_model_1 = require("../ast-to-reports/models/ast/json-ast.model");
const language_enum_1 = require("../core/enum/language.enum");
exports.LIMIT_CONVERSIONS = true;
/**
 * Main process of the conversion to JsonAst
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
        convert_options_model_1.ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                const jsonAst = new json_ast_model_1.JsonAst();
                jsonAst.astFolder = initService.generateAll(pathToAnalyze);
                jsonAst.logg();
        }
        console.log(ansi_colors_1.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
