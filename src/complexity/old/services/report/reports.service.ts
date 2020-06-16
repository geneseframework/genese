import { TreeFolder } from '../../models/tree/tree-folder.model';
import { Options } from '../../models/options';
import { TreeFolderReportService } from './tree-folder-report.service';
import { copyFile, createRelativeDir } from '../file.service';
import { TreeFileReportService } from './tree-file-report.service';
import { TreeFile } from '../../models/tree/tree-file.model';


/**
 * Service for reports generation
 */
export class ReportsService {

    /**
     * MainConvertTs reports generation process
     * @param treeFolder        // The main folder
     */
    static generateAllReports(treeFolder: TreeFolder): void {
        ReportsService.createStyleFiles();
        const parentFolder: TreeFolder = new TreeFolder();
        parentFolder.subFolders.push(treeFolder);
        ReportsService.generateSubfoldersReports(treeFolder);
    }


    /**
     * Generates reports of children recursively
     * @param treeFolder        // The AstFolder to analyse
     */
    private static generateSubfoldersReports(treeFolder: TreeFolder): void{
        ReportsService.generateFolderReport(treeFolder);
        for (const subFolder of treeFolder.subFolders) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    /**
     * Generates a report for a given folder
     * @param treeFolder        // The AstFolder to analyse
     */
    private static generateFolderReport(treeFolder: TreeFolder): void {
        const folderReportService = new TreeFolderReportService(treeFolder);
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
        const fileReportService = new TreeFileReportService(treeFile);
        fileReportService.generateReport();
    }


    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    private static createStyleFiles(): void {
        createRelativeDir('reports-styles');
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/report.css`, `${Options.pathOutDir}/reports-styles/report.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/styles.css`, `${Options.pathOutDir}/reports-styles/styles.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prettify.css`, `${Options.pathOutDir}/reports-styles/prettify.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prism.css`, `${Options.pathOutDir}/reports-styles/prism.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prism.js`, `${Options.pathOutDir}/reports-styles/prism.js`);
        copyFile(`${Options.pathGeneseNodeJs}/node_modules/chart.js/dist/Chart.js`, `${Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
