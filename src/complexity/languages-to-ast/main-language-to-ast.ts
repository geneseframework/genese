import { blueBright } from 'ansi-colors';
import { InitConversionService } from './ts/services/init-conversion.service';
import { ConvertOptions } from './core/convert-options.model';
import { JsonAst } from '../core/models/ast/json-ast.model';
import { Language } from '../core/enum/language.enum';


/**
 * MainConvertTs process of the analysis
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
        console.log('START CONVERSION FROM TS TO JSON');
        ConvertOptions.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs)
        console.log(console.log('IGNORRRR', ConvertOptions.ignore))
        switch (language) {
            case Language.TS:
                const initService = new InitConversionService();
                const jsonAst: JsonAst = initService.generateAll(pathToAnalyze);
                jsonAst.logg();
        }
        console.log(blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }

}
