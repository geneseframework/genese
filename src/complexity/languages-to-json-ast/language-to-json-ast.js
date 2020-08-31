"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageToJsonAst = void 0;
const init_generation_service_1 = require("./ts/services/init-generation.service");
const language_enum_1 = require("../core/enum/language.enum");
const chalk = require("chalk");
const json_service_1 = require("./json.service");
const file_service_1 = require("../core/services/file.service");
const globals_const_1 = require("./globals.const");
/**
 * Main process of the parsing to JsonAst format
 */
class LanguageToJsonAst {
    /**
     * Starts the parsing to Json Ast format
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param language              // The language to parse and convert into JsonAst
     */
    static start(pathToAnalyze, language) {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        console.log('Please wait...');
        globals_const_1.project.addSourceFilesAtPaths(`${pathToAnalyze}/**/*.ts`);
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
        const jsonAst = {
            astFolder: undefined
        };
        const initService = new init_generation_service_1.InitGenerationService();
        let astFolder = initService.generateAll(pathToAnalyze).astFolder;
        astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }
}
exports.LanguageToJsonAst = LanguageToJsonAst;
