import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { TsFolderReportService } from './ts-folder-report.service';
import { copyFile, createRelativeDir } from './file.service';
import { TsFileReportService } from './ts-file-report.service';
import { TsFile } from '../models/ts-file.model';

const appRoot = require('app-root-path').toString();

export class ReportsService {

    static generateAllReports(tsFolder: TsFolder): void {
        ReportsService.createStyleFiles();
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(tsFolder);
        ReportsService.generateSubfoldersReports(tsFolder);
    }


    private static generateSubfoldersReports(tsFolder: TsFolder): void{
        ReportsService.generateFolderReport(tsFolder);
        for (const subFolder of tsFolder.subFolders) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    private static generateFolderReport(tsFolder: TsFolder): void {
        const folderReportService = new TsFolderReportService(tsFolder);
        folderReportService.generateReport();
        for (const file of tsFolder.tsFiles) {
            ReportsService.generateFileReport(file);
        }
    }


    private static generateFileReport(tsFile: TsFile): void {
        const fileReportService = new TsFileReportService(tsFile);
        fileReportService.generateReport();
    }


    private static createStyleFiles(): void {
        createRelativeDir('reports-styles');
        copyFile(`${appRoot}/src/templates/styles/report.css`, `${Options.pathReports}/reports-styles/report.css`);
        copyFile(`${appRoot}/src/templates/styles/styles.css`, `${Options.pathReports}/reports-styles/styles.css`);
        copyFile(`${appRoot}/src/templates/styles/prettify.css`, `${Options.pathReports}/reports-styles/prettify.css`);
        copyFile(`${appRoot}/src/templates/styles/prism.css`, `${Options.pathReports}/reports-styles/prism.css`);
        copyFile(`${appRoot}/src/templates/styles/prism.js`, `${Options.pathReports}/reports-styles/prism.js`);
    }
}
