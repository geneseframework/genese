import { blueBright } from 'ansi-colors';
import { InitConversionService } from './services/init-conversion.service';
import { ConvertOptions } from '../core/convert-options.model';
import { JsonAst } from '../../ast-to-reports/models/ast/json-ast.model';
import { Language } from '../../ast-to-reports/enums/language.enum';


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
        // ConvertOptions.se
        const jsonAst: JsonAst = new JsonAst();
        switch (language) {
            case Language.TS:
                const initService = new InitConversionService();
                jsonAst.astFolder = initService.generateTree(pathToAnalyze);
                console.log('JSONASTTTT', jsonAst)
        }
        console.log(blueBright('CONVERSION GENERATED SUCCESSFULLY'));
    }

}
