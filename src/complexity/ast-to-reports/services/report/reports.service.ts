import { Options } from '../../models/options';
import { copyFile, createRelativeDir } from '../../../core/services/file.service';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderReportService } from './ast-folder-report.service';
import { AstFileReportService } from './ast-file-report.service';
import { AstFile } from '../../models/ast/ast-file.model';
import { JsonAst } from '../../models/ast/json-ast.model';


/**
 * Service for reports generation
 */
export class ReportsService {

    /**
     * MainConvertTs reports generation process
     * @param jsonAst
     */
    static generateAllReports(jsonAst: JsonAst): void {
        ReportsService.createStyleFiles();
        const parentFolder: AstFolder = jsonAst.astFolder;
        // parentFolder.children.push(astFolder);
        ReportsService.generateSubfoldersReports(parentFolder);
    }
    // static generateAllReports(astFolder: AstFolder): void {
    //     ReportsService.createStyleFiles();
    //     const parentFolder: AstFolder = new AstFolder();
    //     parentFolder.children.push(astFolder);
    //     ReportsService.generateSubfoldersReports(astFolder);
    // }


    /**
     * Generates reports of children recursively
     * @param astFolder        // The AstFolder to analyse
     */
    private static generateSubfoldersReports(astFolder: AstFolder): void{
        ReportsService.generateFolderReport(astFolder);
        for (const subFolder of astFolder.children) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    /**
     * Generates a report for a given folder
     * @param astFolder        // The AstFolder to analyse
     */
    private static generateFolderReport(astFolder: AstFolder): void {
        const folderReportService = new AstFolderReportService(astFolder);
        folderReportService.generateReport();
        for (const file of astFolder.astFiles) {
            ReportsService.generateFileReport(file);
        }
    }


    /**
     * Generates a report for a given file
     * @param astFile        // The AstFile to analyse
     */
    private static generateFileReport(astFile: AstFile): void {
        const fileReportService = new AstFileReportService(astFile);
        fileReportService.generateReport();
    }


    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    private static createStyleFiles(): void {
        createRelativeDir('reports-styles');
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/styles/report.css`, `${Options.pathOutDir}/reports-styles/report.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/styles/styles.css`, `${Options.pathOutDir}/reports-styles/styles.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/styles/prettify.css`, `${Options.pathOutDir}/reports-styles/prettify.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/styles/prism.css`, `${Options.pathOutDir}/reports-styles/prism.css`);
        copyFile(`${Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/styles/prism.js`, `${Options.pathOutDir}/reports-styles/prism.js`);
        copyFile(`${Options.pathGeneseNodeJs}/node_modules/chart.js/dist/Chart.js`, `${Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
