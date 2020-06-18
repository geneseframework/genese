"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = exports.LIMIT_CONVERSIONS = void 0;
const fs = require("fs-extra");
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const convert_options_model_1 = require("./core/models/convert-options.model");
const json_ast_model_1 = require("../ast-to-reports/models/ast/json-ast.model");
const language_enum_1 = require("../core/enum/language.enum");
const chalk = require("chalk");
const json_service_1 = require("./core/services/json.service");
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
        console.log(chalk.blueBright('STARTS CONVERSION FROM TS TO JSON'));
        convert_options_model_1.ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        const jsonAst = new json_ast_model_1.JsonAst();
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                jsonAst.astFolder = initService.generateAll(pathToAnalyze).tsFolder;
        }
        const pathReport = `./ast-ts.json`;
        console.log('PATH REPORT', pathReport);
        console.log('JSONNNNN', jsonAst);
        // jsonAst.astFolder.logg('JSN');
        // const zzz = 	{
        //     "children": [
        //         {
        //             "end": 2,
        //             "pos": 5
        //         },
        //         {
        //             "zzz": "E"
        //         }
        //     ]
        // }
        // fs.writeFileSync(pathReport, JsonService.prettifyJson(zzz), {encoding: 'utf-8'});
        fs.writeFileSync(pathReport, json_service_1.JsonService.prettifyJson(jsonAst), { encoding: 'utf-8' });
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
