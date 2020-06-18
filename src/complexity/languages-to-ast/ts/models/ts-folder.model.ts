import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { TsFile } from './ts-file.model';
import { TsNode } from './ts-node.model';

export class TsFolder implements Logg {


    tsFiles?: TsFile[] = [];                                                // The array of files of this folder (not in the subfolders)
    children?: TsFolder[] = [];                                             // The subfolders of this folder
    parent?: TsFolder = undefined;                                            // The TsFolder corresponding to the parent folder of this TsFolder
    path?: string = undefined;                                                                 // The absolute path of this folder



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), this.parent?.path);
        for (const astFile of this.tsFiles) {
            const name = astFile?.name ?? '';
            console.log(chalk.blueBright('TsFile'), chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile?.tsNode, `  `)
        }
    }


    loggChildren(tsNode: TsNode, indent = ''): void {
        for (const childAstNode of tsNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }
}
