import * as ts from 'typescript';
import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/reports.service';
import { TreeFolderService } from './services/tree-folder.service';
import { blueBright } from 'ansi-colors';

export const DEBUG = true;     // Set to true to use Genese Complexity in DEBUG mode (with npm run debug)

/**
 * Main process of the analysis
 */
export class Main {

    constructor() {
    }

    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log('START CALCULATION');
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        createOutDir();
        const tsFolder = TreeFolderService.generateTree(Options.pathFolderToAnalyze, 'ts');
        ReportsService.generateAllReports(tsFolder);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }

}
