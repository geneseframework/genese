"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConvertTs = void 0;
const ansi_colors_1 = require("ansi-colors");
const init_conversion_service_1 = require("./ts/services/init-conversion.service");
const convert_options_model_1 = require("./core/convert-options.model");
const language_enum_1 = require("../core/enum/language.enum");
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
        convert_options_model_1.ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        console.log(console.log('IGNORRRR', convert_options_model_1.ConvertOptions.ignore));
        switch (language) {
            case language_enum_1.Language.TS:
                const initService = new init_conversion_service_1.InitConversionService();
                const jsonAst = initService.generateAll(pathToAnalyze);
                jsonAst.logg();
        }
        console.log(ansi_colors_1.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }
}
exports.MainConvertTs = MainConvertTs;
