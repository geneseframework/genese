import { createOutDir } from './core/services/file.service';
import { Options } from './core/models/options.model';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';
import * as chalk from 'chalk';
import { Language } from './core/enum/language.enum';

import { parse } from 'java-parser';
import { cstToAst } from './languages-to-json-ast/java/cstToAst';

export const START = Date.now();

export function duration() {
    return (Date.now() - START) / 1000;
}

export function showDuration(message: string, color = 'cyanBright') {
    console.log(chalk[color](message), duration());
}

/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
export class Main {

    /**
     * Starts the analysis
     * @param  {string} pathCommand
     * @param  {string} pathFolderToAnalyze
     * @param  {string} pathGeneseNodeJs
     * @param  {Language} language?
     * @returns void
     */
    // @ts-ignore
    start(pathCommand: string, pathFolderToAnalyze: string, pathGeneseNodeJs: string, language?: Language): void {
        // const cst = parse('public class Application {\n' +
        //     '\n' +
        //     '    int somme(int a, int b) {\n' +
        //     '        if(a < b) {\n' +
        //     '          return a * b;\n' +
        //     '        }\n' +
        //     '    }\n' +
        //     '}\n');
        // console.log('cst', cst);
        //
        // const methodBody = cst.children.ordinaryCompilationUnit[0].children.typeDeclaration[0].children.classDeclaration[0].children.normalClassDeclaration[0].children.classBody[0].children.classBodyDeclaration[0].children.classMemberDeclaration[0].children.methodDeclaration[0].children.methodBody;
        // const ifStatement = methodBody[0].children.block[0].children.blockStatements[0].children.blockStatement[0].children.statement[0].children.ifStatement[0];
        // const ast = cstToAst(ifStatement)
        // console.log('ast', JSON.stringify(ast));

        console.log(`PATH TO ANALYZE : ${pathFolderToAnalyze}`);
        Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        createOutDir();
        LanguageToJsonAst.start(Options.pathFolderToAnalyze, language);
        JsonAstToReports.start(pathCommand)
    }

}
