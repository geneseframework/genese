import { createOutDir } from './core/services/file.service';
import { Options } from './core/models/options.model';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';


/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
export class Main {


    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    // TODO : Add language option and path to JsonAst file
    start(pathCommand: string, pathFolderToAnalyze: string, pathGeneseNodeJs: string, jsonAstPath = '/json-ast.json'): void {
        console.log(`PATH TO ANALYZE : ${pathFolderToAnalyze}`);
        Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        createOutDir();
        LanguageToJsonAst.start(pathCommand, Options.pathFolderToAnalyze, pathGeneseNodeJs);
        JsonAstToReports.start(pathCommand, Options.pathFolderToAnalyze, pathGeneseNodeJs)
    }

}
