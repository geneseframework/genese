import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/report/reports.service';
import { blueBright } from 'ansi-colors';
import { Language } from './ast/enums/language.enum';
import { AstFolderService } from './ast/services/ast-folder.service';
import { TreeFolderService } from './services/tree/tree-folder.service';

export const DEBUG = true;     // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file

/**
 * MainAst process of the analysis
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
