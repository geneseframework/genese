import { InitConversionService } from './ts/services/init-conversion.service';
import { ConvertOptions } from './core/convert-options.model';
import { JsonAst } from '../ast-to-reports/models/ast/json-ast.model';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';

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
        switch (language) {
            case Language.TS:
                const initService = new InitConversionService();
                const jsonAst = new JsonAst();
                const zzz = initService.generateAll(pathToAnalyze);
                console.log('ZZZ', zzz)
                jsonAst.astFolder = initService.generateAll(pathToAnalyze) as any;
                console.log('JSONASTTTT', jsonAst.astFolder?.path)
                jsonAst.logg();
        }
        console.log(chalk.blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }

}
