"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageToJsonAst = exports.DEBUG_MOCK = exports.LIMIT_CONVERSIONS = void 0;
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const language_enum_1 = require("../core/enum/language.enum");
const chalk = require("chalk");
const json_service_1 = require("./json.service");
const file_service_1 = require("../core/services/file.service");
const json_ast_model_1 = require("../json-ast-to-reports/models/ast/json-ast.model");
const options_model_1 = require("../core/models/options.model");
exports.LIMIT_CONVERSIONS = true;
exports.DEBUG_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';
/**
 * Main process of the conversion to JsonAst
 */
class LanguageToJsonAst {
    /**
     * Starts the conversion
     * @param pathCommand           // The path to the directory where the user enters the command line
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param pathGeneseNodeJs      // The path to Genese module installed globally on the user's device
     * @param language              // The language to parse and convert into JsonAst
     */
    static start(pathCommand, pathToAnalyze, pathGeneseNodeJs, language) {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        options_model_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        let jsonAst;
        switch (language) {
            case language_enum_1.Language.TS:
                jsonAst = LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
                break;
            default:
                jsonAst = LanguageToJsonAst.generateFromAllFiles(pathToAnalyze);
                break;
        }
        file_service_1.createFile(`./json-ast.json`, json_service_1.JsonService.prettifyJson(jsonAst));
        console.log(chalk.greenBright('JSON AST GENERATED SUCCESSFULLY'));
    }
    // TODO: implement for all languages
    static generateFromAllFiles(pathToAnalyze) {
        return LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
    }
    static generateFromTsFiles(pathToAnalyze) {
        const jsonAst = new json_ast_model_1.JsonAst();
        const initService = new init_conversion_service_1.InitConversionService();
        let astFolder = initService.generateAll(pathToAnalyze).tsFolder;
        astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }
}
exports.LanguageToJsonAst = LanguageToJsonAst;
