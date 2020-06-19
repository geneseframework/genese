"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = exports.DEBUG_MOCK = exports.LIMIT_CONVERSIONS = void 0;
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const convert_options_model_1 = require("./core/models/convert-options.model");
const json_ast_model_1 = require("../ast-to-reports/models/ast/json-ast.model");
const language_enum_1 = require("../core/enum/language.enum");
const chalk = require("chalk");
const json_service_1 = require("./core/services/json.service");
const file_service_1 = require("../core/services/file.service");
exports.LIMIT_CONVERSIONS = false;
exports.DEBUG_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';
/**
 * Main process of the conversion to JsonAst
 */
class MainConvertTs {
    /**
     * Starts the conversion
     * @param pathCommand           // The path to the directory where the user enters the command line
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param pathGeneseNodeJs      // The path to Genese module installed globally on the user's device
     * @param language              // The language to parse and convert into JsonAst
     */
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs, language) {
        console.log(chalk.blueBright('STARTS CONVERSION FROM TS TO JSON'));
        convert_options_model_1.ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        const jsonAst = new json_ast_model_1.JsonAst();
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                let astFolder = initService.generateAll(pathToAnalyze).tsFolder;
                astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
                jsonAst.astFolder = astFolder;
        }
        file_service_1.createFile(`./ast-ts.json`, json_service_1.JsonService.prettifyJson(jsonAst));
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
