import { InitConversionService } from './ts/services/init-conversion.service';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';
import { JsonService } from './json.service';
import { createFile } from '../core/services/file.service';
import { Project } from 'ts-morph';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { WeightsService } from './ts/libraries-weights/weights.service';

export const LIMIT_CONVERSIONS = false;
export const DEV_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';
export const WEIGHTS = WeightsService.merge();
export const WEIGHTED_METHODS = WeightsService.weightedMethods();
export let project  = new Project();

/**
 * Main process of the parsing to JsonAst format
 */
export class LanguageToJsonAst {
    static duration = {};
    static incrementIdentifierDuration(dt: number, v: string) {
        LanguageToJsonAst.duration[v] = LanguageToJsonAst.duration[v] ? LanguageToJsonAst.duration[v] + Date.now() - dt : Date.now() - dt;
    }
    /**
     * Starts the parsing to Json Ast format
     * @param pathToAnalyze         // The path of the folder to analyse
     * @param language              // The language to parse and convert into JsonAst
     */
    static start(pathToAnalyze: string, language?: Language): void {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        console.log('Please wait...')
        project.addSourceFilesAtPaths(`${pathToAnalyze}/**/*.ts`);
        let jsonAst: JsonAstInterface;
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
    private static generateFromAllFiles(pathToAnalyze: string): JsonAstInterface {
        return LanguageToJsonAst.generateFromTsFiles(pathToAnalyze);
    }


    private static generateFromTsFiles(pathToAnalyze: string): JsonAstInterface {
        const jsonAst: JsonAstInterface = {
            astFolder: undefined
        };
        // const jsonAst = new JsonAst();
        const initService = new InitConversionService();
        let astFolder = initService.generateAll(pathToAnalyze).astFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }

}
