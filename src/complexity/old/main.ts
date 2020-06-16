import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/report/reports.service';
import { blueBright } from 'ansi-colors';
import { TreeFolderService } from './services/tree/tree-folder.service';
import { Language } from '../core/enum/language.enum';

export const DEBUG = false;     // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file

/**
 * MainConvertTs process of the analysis
 */
export class Main {

    treeFolderService?: TreeFolderService = new TreeFolderService();    // The service managing TreeFolders

    constructor() {
    }

    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, language?: string): void {
        console.log('START CALCULATION');
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        createOutDir();
        const treeFolder = this.treeFolderService.generateTree(Options.pathFolderToAnalyze, Language.TS);
        ReportsService.generateAllReports(treeFolder);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }

}
