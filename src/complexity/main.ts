import { createOutDir } from './core/services/file.service';
import { Options } from './core/models/options.model';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';
import * as chalk from 'chalk';
import { ReportToRefactorReport } from './reports-to-refactor-proposals/reports-to-refactor-proposals';

export const START = Date.now();
export function duration() {
    return (Date.now() - START) / 1000;
}
export function showDuration(message: string, color = 'cyanBright') {
    console.log(chalk[color](message), duration());
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
    start(pathCommand: string, pathFolderToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log(`PATH TO ANALYZE : ${pathFolderToAnalyze}`);
        Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        createOutDir();
        LanguageToJsonAst.start(Options.pathFolderToAnalyze);
        JsonAstToReports.start(pathCommand);
        ReportToRefactorReport.start(JsonAstToReports.astFolder);
    }
}
