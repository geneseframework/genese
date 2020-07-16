import { createOutDir } from './core/services/file.service';
import { Options } from './core/models/options.model';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';
import * as chalk from 'chalk';

export const START = Date.now();
export function duration() {
    return (Date.now() - START)/1000;
}
export function showDuration(message: string, color = 'cyanBright') {
    console.log(chalk[color](message), duration())
}

/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
export class Main {


    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     */
    // TODO : Add language option and path to JsonAst file
    start(pathCommand: string, pathFolderToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log(`PATH TO ANALYZE : ${pathFolderToAnalyze}`);
        Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        createOutDir();
        // LanguageToJsonAst.start('/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese-tests/src/');
        showDuration('START ! ', 'greenBright');
        LanguageToJsonAst.start(Options.pathFolderToAnalyze);
        showDuration('END LANGUAGE TO JSON ! ', 'greenBright');
        JsonAstToReports.start(pathCommand)
        console.log('IDENTIFIER DURATION', LanguageToJsonAst.duration)
        showDuration('END OF END ! ', 'greenBright');
    }

}
