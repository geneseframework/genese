import * as ts from 'typescript';
import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/report/reports.service';
import { TreeFolderService } from './services/tree/tree-folder.service';
import { blueBright } from 'ansi-colors';

export const DEBUG = true;     // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND with stats only for debug.mock.ts

/**
 * Main process of the analysis
 */
export class Main {

    treeFolderService?: TreeFolderService = new TreeFolderService();

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
        const treeFolder = this.treeFolderService.generateTree(Options.pathFolderToAnalyze, 'ts');
        ReportsService.generateAllReports(treeFolder);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }

}
