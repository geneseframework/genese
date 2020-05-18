import { TreeFolder } from '../models/tree-folder.model';
import { Options } from '../models/options';
import { TsFolderReportService } from './ts-folder-report.service';
import { copyFile, createRelativeDir } from './file.service';
import { TsFileReportService } from './ts-file-report.service';
import { TreeFile } from '../models/tree-file.model';


export class ReportsService {

    static generateAllReports(tsFolder: TreeFolder): void {
        ReportsService.createStyleFiles();
        const parentFolder: TreeFolder = new TreeFolder();
        parentFolder.subFolders.push(tsFolder);
        ReportsService.generateSubfoldersReports(tsFolder);
    }


    private static generateSubfoldersReports(tsFolder: TreeFolder): void{
        ReportsService.generateFolderReport(tsFolder);
        for (const subFolder of tsFolder.subFolders) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    private static generateFolderReport(tsFolder: TreeFolder): void {
        const folderReportService = new TsFolderReportService(tsFolder);
        folderReportService.generateReport();
        for (const file of tsFolder.tsFiles) {
            ReportsService.generateFileReport(file);
        }
    }


    private static generateFileReport(tsFile: TreeFile): void {
        const fileReportService = new TsFileReportService(tsFile);
        fileReportService.generateReport();
    }


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
