"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = exports.LIMIT_CONVERSIONS = void 0;
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const convert_options_model_1 = require("./core/convert-options.model");
const json_ast_model_1 = require("../ast-to-reports/models/ast/json-ast.model");
const language_enum_1 = require("../core/enum/language.enum");
const chalk = require("chalk");
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
        var _a;
        console.log(chalk.blueBright('STARTS CONVERSION FROM TS TO JSON'));
        convert_options_model_1.ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                const jsonAst = new json_ast_model_1.JsonAst();
                const zzz = initService.generateAll(pathToAnalyze);
                console.log('ZZZ', zzz);
                jsonAst.astFolder = initService.generateAll(pathToAnalyze);
                console.log('JSONASTTTT', (_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.path);
                jsonAst.logg();
        }
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
