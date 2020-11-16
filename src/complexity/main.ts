import { createOutDir, deleteFile } from './core/services/file.service';
import { Options } from './core/models/options.model';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import * as chalk from 'chalk';
import { Language } from './core/enum/language.enum';
import { strict } from 'assert';
import { AstFolder } from './json-ast-to-reports/models/ast/ast-folder.model';

const ora = require('ora');
const {Worker} = require('worker_threads');

const spinner = ora();

/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
export class Main {

    useWorker(filepath, data): any {
        return new Promise((resolve, reject) => {
            const worker = new Worker(filepath, {workerData: data});

            worker.on('message', message => {
                resolve(message);
            });

            worker.on('error', reject);
            worker.on('exit', code => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }


    /**
     * Starts the analysis
     * @param  {string} pathCommand
     * @param  {string} pathFolderToAnalyze
     * @param  {string} pathGeneseNodeJs
     * @param  {Language} language?
     * @param markdown
     * @param consoleMode
     * @returns void
     */
    // @ts-ignore
    async start(
        pathCommand: string,
        pathFolderToAnalyze: string,
        pathGeneseNodeJs: string,
        language?: Language,
        markdown = false,
        consoleMode = false
    ): Promise<number> {
        const modifiedPath = pathFolderToAnalyze.split('/').filter(e => e !== '.').join('/');
        Options.setOptions(pathCommand, modifiedPath, pathGeneseNodeJs);
        if (!consoleMode) {
            createOutDir();
        }

        spinner.start('AST generation');
        await this.useWorker(
            `${__dirname}/workers/ast-worker.js`,
            {
                pathCommand: pathCommand,
                modifiedPath: modifiedPath,
                pathGeneseNodeJs: pathGeneseNodeJs,
                language: language
            });
        spinner.succeed();

        spinner.start('Report generation');
        const reportResult: { message: any; astFolder: AstFolder } = await this.useWorker(
            `${__dirname}/workers/report-worker.js`,
            {
                pathCommand: pathCommand,
                modifiedPath: modifiedPath,
                pathGeneseNodeJs: pathGeneseNodeJs,
                markdown: markdown,
                consoleMode: consoleMode,
            });
        spinner.succeed();

        if (language === Language.TS && !consoleMode) {
            spinner.start('Refactoring generation');
            await this.useWorker(
                `${__dirname}/workers/refactoring-worker.js`,
                {
                    pathCommand: Options.pathCommand,
                    modifiedPath: modifiedPath,
                    pathGeneseNodeJs: pathGeneseNodeJs,
                    astFolder: reportResult.astFolder
                });
            spinner.succeed();
        }

        deleteFile('./json-ast.json');

        if (reportResult.message && reportResult.message.length > 0) {
            console.log();
            if (typeof reportResult.message === 'object') {
                console.table(reportResult.message, ['filename', 'methodName', 'cpxIndex']);
            } else {
                console.log(reportResult.message);
            }
            if (consoleMode) {
                return 1;
            }
        }
        return 0;
    }
}
