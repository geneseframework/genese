import { InitService } from './services/init.service';
import { JsonAst } from './models/ast/json-ast.model';
import { ReportsService } from './services/report/reports.service';
import * as chalk from 'chalk';
import { AstFolder } from './models/ast/ast-folder.model';
import * as terminalLink from 'terminal-link';


/**
 * Main process jsonAst analysis and reports
 */
export class JsonAstToReports {

    static astFolder: AstFolder;

    /**
     * Starts the analysis
     * @param pathCommand
     * @param jsonAstPath
     * @param markdown
     * @param consoleMode
     */
    static start(pathCommand: string, jsonAstPath = '/json-ast.json', markdown: boolean, consoleMode: boolean): void {
        console.log(chalk.blueBright('STARTS REPORTS GENERATION FROM JSON_AST'));
        console.log('Please wait...')
        const jsonAst = new InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        if(markdown){
            ReportsService.generateMarkdownReports(jsonAst)
        } else if (consoleMode) {
            ReportsService.generateConsoleReports(jsonAst)
        } else {
            ReportsService.generateAllReports(jsonAst)
            const link = terminalLink('folder-report.html', `file://${pathCommand}/genese/complexity/reports/folder-report.html`);
            console.log(`Please open in your browser the file "${link}" located in your genese reports folder.`)
        }
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        this.astFolder = jsonAst.astFolder;
    }


    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    private static getJsonAst(jsonAstPath: string): JsonAst {
        return require(jsonAstPath);
    }

}
