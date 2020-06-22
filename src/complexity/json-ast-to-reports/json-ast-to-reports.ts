import { InitService } from './services/init.service';
import { JsonAst } from './models/ast/json-ast.model';
import { createOutDir } from '../core/services/file.service';
import { ReportsService } from './services/report/reports.service';
import * as chalk from 'chalk';
import { Options } from '../core/models/options.model';


/**
 * Main process jsonAst analysis and reports
 */
export class JsonAstToReports {


    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    static start(pathCommand: string, pathFolderToAnalyze: string, pathGeneseNodeJs: string, jsonAstPath = '/json-ast.json'): void {
        console.log(chalk.blueBright('START REPORTS GENERATION FROM JSON_AST'));
        const jsonAst = new InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        ReportsService.generateAllReports(jsonAst);
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open the file "folder-report.html" located in "genese" folder in your browser')
    }


    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    private static getJsonAst(jsonAstPath: string): JsonAst {
        const jsonAst: JsonAst = require(jsonAstPath);
        return jsonAst;
    }

}
