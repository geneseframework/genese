import { InitConversionService } from './ts/services/init-conversion.service';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';
import { JsonService } from './json.service';
import { createFile } from '../core/services/file.service';
import { JsonAst } from '../json-ast-to-reports/models/ast/json-ast.model';
import { Options } from '../core/models/options.model';

export const LIMIT_CONVERSIONS = true;
export const DEBUG_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';

/**
 * Main process of the conversion to JsonAst
 */
export class LanguageToJsonAst {


    /**
     * Starts the conversion
     * @param pathCommand           // The path to the directory where the user enters the command line
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param pathGeneseNodeJs      // The path to Genese module installed globally on the user's device
     * @param language              // The language to parse and convert into JsonAst
     */
    static start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, language?: Language): void {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        let jsonAst: JsonAst;
        switch (language) {
            case Language.TS:
                jsonAst = LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
                break;
            default:
                jsonAst = LanguageToJsonAst.generateFromAllFiles(pathToAnalyze);
                break;
        }
        createFile(`./json-ast.json`, JsonService.prettifyJson(jsonAst));
        console.log(chalk.greenBright('JSON AST GENERATED SUCCESSFULLY'));
    }


    // TODO: implement for all languages
    private static generateFromAllFiles(pathToAnalyze: string): JsonAst {
        return LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
    }


    private static generateFromTsFiles(pathToAnalyze: string): JsonAst {
        const jsonAst = new JsonAst();
        const initService = new InitConversionService();
        let astFolder = initService.generateAll(pathToAnalyze).tsFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }

}
