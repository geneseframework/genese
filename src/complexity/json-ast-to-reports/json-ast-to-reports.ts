import { InitService } from './services/init.service';
import { JsonAst } from './models/ast/json-ast.model';
import { ReportsService } from './services/report/reports.service';
import * as chalk from 'chalk';
import { AstFolder } from './models/ast/ast-folder.model';


/**
 * Main process jsonAst analysis and reports
 */
export class JsonAstToReports {

    static astFolder: AstFolder;

    /**
     * Starts the analysis
     * @param pathCommand
     * @param jsonAstPath
     */
    static start(pathCommand: string, jsonAstPath = '/json-ast.json', markdown:boolean = false): void {
        console.log(chalk.blueBright('STARTS REPORTS GENERATION FROM JSON_AST'));
        console.log('Please wait...')
        const jsonAst = new InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        markdown ? ReportsService.generateMarkdownReports(jsonAst): ReportsService.generateAllReports(jsonAst)
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open in your browser the file "folder-report.html" located in your genese reports folder.')
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
