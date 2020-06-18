import { Logg } from '../../../core/interfaces/logg.interface';
import { TsFolder } from './ts-folder.model';
import * as chalk from 'chalk';
import { TsNode } from './ts-node.model';

export class TsJsonAst implements Logg {

    tsFolder?: TsFolder = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    // get tsFolder(): TsFolder {
    //     return this.#tsFolder;
    // }
    //
    //
    // set tsFolder(tsFolder: TsFolder) {
    //     this.#tsFolder = tsFolder;
    // }


    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'TS JSON_AST'));
        console.log(this.tsFolder?.path);
        console.log('-----------------------------');
        for (const tsFile of this.tsFolder?.tsFiles ?? []) {
            console.log(chalk.blueBright('tsFile'), tsFile?.name);
            console.log(chalk.blueBright('tsFile astNode'), tsFile?.tsNode?.kind);
            this.loggChildren(tsFile.tsNode, '  ');
        }
        console.log(chalk.blueBright('children'), this.tsFolder?.children);
    }


    loggChildren(tsNode: TsNode, indent = ''): void {
        for (const childAstNode of tsNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }
}
