"use strict";
exports.__esModule = true;
exports.LanguageToJsonAst = void 0;
var init_generation_service_1 = require("./ts/services/init-generation.service");
var language_enum_1 = require("../core/enum/language.enum");
var chalk = require("chalk");
var json_service_1 = require("./json.service");
var file_service_1 = require("../core/services/file.service");
var globals_const_1 = require("./globals.const");
/**
 * Main process of the parsing to JsonAst format
 */
var LanguageToJsonAst = /** @class */ (function () {
    function LanguageToJsonAst() {
    }
    /**
     * Starts the parsing to Json Ast format
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param language              // The language to parse and convert into JsonAst
     */
    LanguageToJsonAst.start = function (pathToAnalyze, language) {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        console.log('Please wait...');
        globals_const_1.project.addSourceFilesAtPaths(pathToAnalyze + "/**/*.ts");
        var jsonAst;
        switch (language) {
            case language_enum_1.Language.TS:
                jsonAst = LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
                break;
            default:
                jsonAst = LanguageToJsonAst.generateFromAllFiles(pathToAnalyze);
                break;
        }
        file_service_1.createFile("./json-ast.json", json_service_1.JsonService.prettifyJson(jsonAst));
        console.log(chalk.greenBright('JSON AST GENERATED SUCCESSFULLY'));
    };
    // TODO: implement for all languages
    LanguageToJsonAst.generateFromAllFiles = function (pathToAnalyze) {
        return LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
    };
    LanguageToJsonAst.generateFromTsFiles = function (pathToAnalyze) {
        var jsonAst = {
            astFolder: undefined
        };
        var initService = new init_generation_service_1.InitGenerationService();
        var astFolder = initService.generateAll(pathToAnalyze).astFolder;
        astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    };
    return LanguageToJsonAst;
}());
exports.LanguageToJsonAst = LanguageToJsonAst;
