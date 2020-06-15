import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { blueBright } from 'ansi-colors';
import { InitService } from './ast/services/init.service';
import { JsonAst } from './ast/models/ast/json-ast.model';
import * as fs from 'fs-extra';

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
     * @param geneseConfigPath
     * @param jsonAstPath
     */
    start(pathCommand: string, geneseConfigPath = '/geneseconfig.json', jsonAstPath = '/ast.json'): void {
        console.log('START CALCULATION');
        // this.createSyntaxKindEnum();
        Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        createOutDir();
        const jsonAst = this.initService.generateAstFolders(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.evaluate();
        // ReportsService.generateAllReports(astFolder);
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
