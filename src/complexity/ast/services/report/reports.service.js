"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../../models/options");
const file_service_1 = require("../file.service");
const ast_folder_model_1 = require("../../models/ast/ast-folder.model");
const ast_folder_report_service_1 = require("./ast-folder-report.service");
const ast_file_report_service_1 = require("./ast-file-report.service");
/**
 * Service for reports generation
 */
class ReportsService {
    /**
     * MainAst reports generation process
     * @param astFolder        // The main folder
     */
    static generateAllReports(astFolder) {
        ReportsService.createStyleFiles();
        const parentFolder = new ast_folder_model_1.AstFolder();
        parentFolder.children.push(astFolder);
        ReportsService.generateSubfoldersReports(astFolder);
    }
    /**
     * Generates reports of children recursively
     * @param astFolder        // The AstFolder to analyse
     */
    static generateSubfoldersReports(astFolder) {
        ReportsService.generateFolderReport(astFolder);
        for (const subFolder of astFolder.children) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }
    /**
     * Generates a report for a given folder
     * @param astFolder        // The AstFolder to analyse
     */
    static generateFolderReport(astFolder) {
        const folderReportService = new ast_folder_report_service_1.AstFolderReportService(astFolder);
        folderReportService.generateReport();
        for (const file of astFolder.astFiles) {
            ReportsService.generateFileReport(file);
        }
    }
    /**
     * Generates a report for a given file
     * @param astFile        // The AstFile to analyse
     */
    static generateFileReport(astFile) {
        const fileReportService = new ast_file_report_service_1.AstFileReportService(astFile);
        fileReportService.generateReport();
    }
    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    static createStyleFiles() {
        file_service_1.createRelativeDir('reports-styles');
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/styles/report.css`, `${options_1.Options.pathOutDir}/reports-styles/report.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/styles/styles.css`, `${options_1.Options.pathOutDir}/reports-styles/styles.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/styles/prettify.css`, `${options_1.Options.pathOutDir}/reports-styles/prettify.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/styles/prism.css`, `${options_1.Options.pathOutDir}/reports-styles/prism.css`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/styles/prism.js`, `${options_1.Options.pathOutDir}/reports-styles/prism.js`);
        file_service_1.copyFile(`${options_1.Options.pathGeneseNodeJs}/node_modules/chart.js/dist/Chart.js`, `${options_1.Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
exports.ReportsService = ReportsService;
