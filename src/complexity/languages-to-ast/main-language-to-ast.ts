import * as fs from 'fs-extra';
import { InitConversionService } from './ts/services/init-conversion.service';
import { ConvertOptions } from './core/models/convert-options.model';
import { JsonAst } from '../ast-to-reports/models/ast/json-ast.model';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';
import { JsonService } from './core/services/json.service';
import { createFile } from '../core/services/file.service';

export const LIMIT_CONVERSIONS = true;

/**
 * Main process of the conversion to JsonAst
 */
export class MainConvertTs {


    /**
     * Starts the conversion
     * @param pathCommand           // The path to the directory where the user enters the command line
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param pathGeneseNodeJs      // The path to Genese module installed globally on the user's device
     * @param language              // The language to parse and convert into JsonAst
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, language: Language): void {
        console.log(chalk.blueBright('STARTS CONVERSION FROM TS TO JSON'));
        ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs)
        const jsonAst = new JsonAst();
        switch (language) {
            case Language.TS:
                const initService = new InitConversionService();
                let astFolder = initService.generateAll(pathToAnalyze).tsFolder as any;
                astFolder = JsonService.astPropertyNames(astFolder);
                jsonAst.astFolder = astFolder;
        }
        createFile(`./ast-ts.json`, JsonService.prettifyJson(jsonAst));
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }

}
