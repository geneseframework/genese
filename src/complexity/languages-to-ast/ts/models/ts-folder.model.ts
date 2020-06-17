import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { TsFile } from './ts-file.model';

export class TsFolder implements Logg {


    #tsFiles?: TsFile[] = [];                                                // The array of files of this folder (not in the subfolders)
    #children?: TsFolder[] = [];                                             // The subfolders of this folder
    #parent?: TsFolder = undefined;                                            // The TsFolder corresponding to the parent folder of this TsFolder
    #path?: string = undefined;                                                                 // The absolute path of this folder



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get tsFiles(): TsFile[] {
        return this.#tsFiles;
    }


    set tsFiles(tsFiles: TsFile[]) {
        this.#tsFiles = tsFiles;
    }


    get children(): TsFolder[] {
        return this.#children;
    }


    set children(children: TsFolder[]) {
        this.#children = children;
    }


    get parent(): TsFolder {
        return this.#parent;
    }


    set parent(parent: TsFolder) {
        this.#parent = parent;
    }


    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.#path = path;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), this.parent?.path);
        console.log(chalk.blueBright('children :'), this.children);
    }
}
