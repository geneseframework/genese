import { blueBright } from 'ansi-colors';
import * as fs from 'fs-extra';
import { InitService } from './services/init.service';
import { Options } from './models/options';
import { JsonAst } from './models/ast/json-ast.model';
import { createOutDir } from '../core/services/file.service';
import { ReportsService } from './services/report/reports.service';


/**
 * MainConvertTs process of the analysis
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
    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string, jsonAstPath = '/ast-ts.json'): void {
        console.log('START CALCULATION');
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        createOutDir();
        const jsonAst = this.initService.generateAllFromJsonAst(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
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
