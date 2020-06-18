import * as chalk from 'chalk';
import * as ts from 'typescript';
import { Logg } from '../../../core/interfaces/logg.interface';
import { TsNode } from './ts-node.model';

export class TsFile implements Logg {

    end: number = undefined;
    name: string = undefined;
    sourceFile?: ts.SourceFile = undefined;                    // The Typescript JsonAst
    text ?= '';
    tsNode?: TsNode = undefined;                             // The TsNode corresponding to the file itself


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


    loggChildren(tsNode: TsNode, indent = ''): void {
        for (const childAstNode of tsNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }


}
