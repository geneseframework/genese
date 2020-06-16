"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const tree_folder_model_1 = require("../../models/tree/tree-folder.model");
const options_1 = require("../../models/options");
const tree_folder_report_service_1 = require("./tree-folder-report.service");
const file_service_1 = require("../file.service");
const tree_file_report_service_1 = require("./tree-file-report.service");
/**
 * Service for reports generation
 */
class ReportsService {
    /**
     * MainConvertTs reports generation process
     * @param treeFolder        // The main folder
     */
    static generateAllReports(treeFolder) {
        ReportsService.createStyleFiles();
        const parentFolder = new tree_folder_model_1.TreeFolder();
        parentFolder.subFolders.push(treeFolder);
        ReportsService.generateSubfoldersReports(treeFolder);
    }
    /**
     * Generates reports of children recursively
     * @param treeFolder        // The AstFolder to analyse
     */
    static generateSubfoldersReports(treeFolder) {
        ReportsService.generateFolderReport(treeFolder);
        for (const subFolder of treeFolder.subFolders) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }
    /**
     * Generates a report for a given folder
     * @param treeFolder        // The AstFolder to analyse
     */
    static generateFolderReport(treeFolder) {
        const folderReportService = new tree_folder_report_service_1.TreeFolderReportService(treeFolder);
        folderReportService.generateReport();
        for (const file of treeFolder.treeFiles) {
            ReportsService.generateFileReport(file);
        }
    }
    /**
     * Generates a report for a given file
     * @param treeFile        // The TreeFile to analyse
     */
    static generateFileReport(treeFile) {
        const fileReportService = new tree_file_report_service_1.TreeFileReportService(treeFile);
        fileReportService.generateReport();
    }
    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    static createStyleFiles() {
        file_service_1.createRelativeDir('reports-styles');
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/report.css`, `${options_1.Options.pathOutDir}/reports-styles/report.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/styles.css`, `${options_1.Options.pathOutDir}/reports-styles/styles.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prettify.css`, `${options_1.Options.pathOutDir}/reports-styles/prettify.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prism.css`, `${options_1.Options.pathOutDir}/reports-styles/prism.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/old/templates/styles/prism.js`, `${options_1.Options.pathOutDir}/reports-styles/prism.js`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/node_modules/chart.js/dist/Chart.js`, `${options_1.Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
exports.ReportsService = ReportsService;
