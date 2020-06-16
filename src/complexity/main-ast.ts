import { createOutDir } from './services/file.service';
import { blueBright } from 'ansi-colors';
import { InitService } from './ast/services/init.service';
import { JsonAst } from './ast/models/ast/json-ast.model';
import * as fs from 'fs-extra';
import { ReportsService } from './ast/services/report/reports.service';
import { Options } from './ast/models/options';

export const DEBUG = true;     // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file

/**
 * MainAst process of the analysis
 */
export class MainAst {

    initService?: InitService = new InitService();    // The service managing TreeFolders

    constructor() {
    }

    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, jsonAstPath = '/ast.json'): void {
        console.log('START CALCULATION');
        // this.createSyntaxKindEnum();
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        // Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        createOutDir();
        const jsonAst = this.initService.generateAllFromJsonAst(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.evaluate();
        ReportsService.generateAllReports(jsonAst);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }


    getJsonAst(jsonAstPath: string): JsonAst {
        const jsonAst: JsonAst = require(jsonAstPath);
        // TODO : check if the JSON is correct
        return jsonAst;
    }


    createSyntaxKindEnum(): void {
        const sk = require('./ast/enums/syntax-kind-old.enum');
        const newSkEnum = new sk.SK();
        let text = 'export enum SyntaxKind {\n';
        for (const key of Object.keys(newSkEnum)) {
            text = `${text}\t${key} = '${key}',\n`;
        }
        text = text.slice(0, -2);
        text = `\n\n${text}}\n`;
        fs.writeFileSync('./syntaxkind.ts', text, {encoding: 'utf-8'});
    }

}
