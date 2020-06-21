import { blueBright } from 'ansi-colors';
import { InitService } from './services/init.service';
import { Options } from './models/options';
import { JsonAst } from './models/ast/json-ast.model';
import { createOutDir } from '../core/services/file.service';
import { ReportsService } from './services/report/reports.service';
import * as chalk from 'chalk';


/**
 * MainConvertTs process of the analysis
 */
export class MainAst {

    initService?: InitService = new InitService();    // The service managing TreeFolders

    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, jsonAstPath = '/ast-ts.json'): void {
        console.log(chalk.blueBright('START REPORTS GENERATION'));
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        createOutDir();
        const jsonAst = this.initService.generateAllFromJsonAst(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        ReportsService.generateAllReports(jsonAst);
        console.log(blueBright('REPORTS GENERATED SUCCESSFULLY'));
    }


    getJsonAst(jsonAstPath: string): JsonAst {
        const jsonAst: JsonAst = require(jsonAstPath);
        return jsonAst;
    }

}
