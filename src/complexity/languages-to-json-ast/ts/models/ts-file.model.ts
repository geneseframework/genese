import * as chalk from 'chalk';
import * as ts from 'typescript';
import { Logg } from '../../../core/interfaces/logg.interface';
import { TsNode } from './ts-node.model';

/**
 * Class corresponding to a ts.SourceFile object
 */
export class TsFile implements Logg {

    end: number = undefined;                                    // The pos of the end of the source code : will be injected as is in the JsonAst file
    name: string = undefined;                                   // The name of the file (ie of the TsFile) : will be injected as is in the JsonAst file
    sourceFile?: ts.SourceFile = undefined;                     // The Typescript SourceFile object corresponding to the file relative to this TsFile
    text ?= '';                                                 // The source code of the TsFile : will be injected as is in the JsonAst file
    tsNode?: TsNode = undefined;                                // The TsNode corresponding to the file itself


    /**
     * Logs the main elements of the TsFile
     * @param message
     */
    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('tsNode :'), this.tsNode?.kind);
        this.loggChildren(this.tsNode, '  ')
    }


    /**
     * Logs the main elements of the children of the TsFile
     * @param tsNode        // The parent TsNode
     * @param indent        // The current indentation in the log
     */
    private loggChildren(tsNode: TsNode, indent = ''): void {
        for (const childAstNode of tsNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }


}
