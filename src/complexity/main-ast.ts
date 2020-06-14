import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/report/reports.service';
import { blueBright } from 'ansi-colors';
import { Language } from './ast/enums/language.enum';
import { AstFolderService } from './ast/services/ast-folder.service';
import exp = require('constants');
import { JsonAst } from './ast/models/json-ast.model';

export const DEBUG = true;     // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file

/**
 * MainAst process of the analysis
 */
export class MainAst {

    astFolderService?: AstFolderService = new AstFolderService();    // The service managing TreeFolders

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
        Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        createOutDir();
        const astFolder = this.astFolderService.generateAstFolders(this.getJsonAst(pathCommand + jsonAstPath));
        // ReportsService.generateAllReports(astFolder);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }


    getJsonAst(jsonAstPath: string): JsonAst {
        const jsonAst: JsonAst = require(jsonAstPath);
        // TODO : check if the JSON is correct
        return jsonAst;
    }

}
