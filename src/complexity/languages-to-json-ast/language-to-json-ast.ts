import { InitGenerationService } from './ts/services/init-generation.service';
import { Language } from '../core/enum/language.enum';
import * as chalk from 'chalk';
import { JsonService } from './json.service';
import { createFile } from '../core/services/file.service';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { project } from './globals.const';
import { InitGenerationJavaService } from './java/services/init-generation-java.service';



/**
 * Main process of the parsing to JsonAst format
 */
export class LanguageToJsonAst {

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
            case Language.JAVA:
                jsonAst = LanguageToJsonAst.generateFromJavaFiles(pathToAnalyze);
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
        const initService = new InitGenerationService();
        let astFolder = initService.generateAll(pathToAnalyze).astFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }

    /**
     * generate AST for Java files
     * @param pathToAnalyze // File path
     */
    private static generateFromJavaFiles(pathToAnalyze: string): JsonAstInterface {
        const jsonAst: JsonAstInterface = {
            astFolder: undefined
        };
        const initJavaService = new InitGenerationJavaService();
        let astFolder = initJavaService.generateAll(pathToAnalyze).astFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }
}
