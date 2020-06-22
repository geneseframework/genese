import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { TsFile } from './ts-file.model';
import { TsNode } from './ts-node.model';

export class TsFolder implements Logg {


    children?: TsFolder[] = [];                                             // The subfolders of this TsFolder
    #parent?: TsFolder = undefined;                                         // The TsFolder corresponding to the parent folder of this TsFolder
    path?: string = undefined;                                              // The absolute path of this TsFolder : will be injected as is in the JsonAst file
    tsFiles?: TsFile[] = [];                                                // The array of files of this TsFolder (not in the subfolders) : will be used to create the property "astFiles" of the JsonAst


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get parent(): TsFolder {
        return this.#parent;
    }


    set parent(tsFolder: TsFolder) {
        this.#parent = tsFolder;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Logs the main elements of the TsFolder
     * @param message
     */
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


    /**
     * Logs the main elements of the children of the TsFolder
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
