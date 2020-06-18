import * as fs from 'fs-extra';
import { InitConversionService } from './ts/services/init-conversion.service';
import { ConvertOptions } from './core/models/convert-options.model';
import { JsonAst } from '../ast-to-reports/models/ast/json-ast.model';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';
import { JsonService } from './core/services/json.service';

export const LIMIT_CONVERSIONS = true;

/**
 * Main process of the conversion to JsonAst
 */
export class MainConvertTs {


    /**
     * Starts the conversion
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param language
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, language: Language): void {
        console.log(chalk.blueBright('STARTS CONVERSION FROM TS TO JSON'));
        ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs)
        const jsonAst = new JsonAst();
        switch (language) {
            case Language.TS:
                const initService = new InitConversionService();
                jsonAst.astFolder = initService.generateAll(pathToAnalyze).tsFolder as any;
        }
        const pathReport = `./genese/ts-ast.json`;
        console.log('PATH REPORT', pathReport)
        console.log('JSONNNNN', jsonAst)
        // jsonAst.astFolder.logg('JSN');
        fs.writeFileSync(pathReport, JsonService.prettyJson(jsonAst), {encoding: 'utf-8'});
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }

}
