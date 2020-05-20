import { TreeFolder } from '../models/tree-folder.model';
import { Options } from '../models/options';
import { TsFolderReportService } from './ts-folder-report.service';
import { copyFile, createRelativeDir } from './file.service';
import { TsFileReportService } from './ts-file-report.service';
import { TreeFile } from '../models/tree-file.model';


/**
 * Service for reports generation
 */
export class ReportsService {

    /**
     * Main reports generation process
     * @param treeFolder        // The main folder
     */
    static generateAllReports(treeFolder: TreeFolder): void {
        ReportsService.createStyleFiles();
        const parentFolder: TreeFolder = new TreeFolder();
        parentFolder.subFolders.push(treeFolder);
        ReportsService.generateSubfoldersReports(treeFolder);
    }


    /**
     * Generates reports of subFolders recursively
     * @param treeFolder        // The TreeFolder to analyse
     */
    private static generateSubfoldersReports(treeFolder: TreeFolder): void{
        ReportsService.generateFolderReport(treeFolder);
        for (const subFolder of treeFolder.subFolders) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    /**
     * Generates a report for a given folder
     * @param treeFolder        // The TreeFolder to analyse
     */
    private static generateFolderReport(treeFolder: TreeFolder): void {
        const folderReportService = new TsFolderReportService(treeFolder);
        folderReportService.generateReport();
        for (const file of treeFolder.treeFiles) {
            ReportsService.generateFileReport(file);
        }
    }


    /**
     * Generates a report for a given file
     * @param treeFile        // The TreeFile to analyse
     */
    private static generateFileReport(treeFile: TreeFile): void {
        const fileReportService = new TsFileReportService(treeFile);
        fileReportService.generateReport();
    }


    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    private static createStyleFiles(): void {
        createRelativeDir('reports-styles');
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/templates/styles/report.css`, `${Options.pathOutDir}/reports-styles/report.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/templates/styles/styles.css`, `${Options.pathOutDir}/reports-styles/styles.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/templates/styles/prettify.css`, `${Options.pathOutDir}/reports-styles/prettify.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/templates/styles/prism.css`, `${Options.pathOutDir}/reports-styles/prism.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/templates/styles/prism.js`, `${Options.pathOutDir}/reports-styles/prism.js`);
        copyFile(`${Options.pathGeneseNodeJs}/node_modules/chart.js/dist/Chart.js`, `${Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
