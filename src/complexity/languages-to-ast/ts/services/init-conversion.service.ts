import * as fs from 'fs-extra';
import { ConvertOptions } from '../../core/models/convert-options.model';
import { LIMIT_CONVERSIONS } from '../../main-language-to-ast';
import { TsFolder } from '../models/ts-folder.model';
import { TsFileConversionService } from './ts-file-conversion.service';
import { TsJsonAst } from '../models/ts-json-ast.model';

/**
 * - TsFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
export class InitConversionService {


    tsFileConversionService?: TsFileConversionService = new TsFileConversionService();  // The service managing TsFiles conversion

    /**
     * Generates the TsFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateAll(path: string): TsJsonAst {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        const tsJsonAst = new TsJsonAst();
        tsJsonAst.tsFolder = this.generateTsFolder(path);
        return tsJsonAst;
    }


    /**
     * Generates the TsFolder corresponding to a given path and to its potential TsFolder parent
     * @param path                  // The path of the TsFolder
     * @param tsFolderParent        // The TsFolder parent
     */
    private generateTsFolder(path: string, tsFolderParent?: TsFolder): TsFolder {
        let tsFolder = new TsFolder();
        tsFolder.parent = tsFolderParent;
        tsFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_CONVERSIONS) {
                    tsFolder.children.push(this.generateTsFolder(`${pathElement}/`, tsFolder))
                } else if (!LIMIT_CONVERSIONS || pathElement === '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts') {
                    tsFolder.tsFiles.push(this.tsFileConversionService.generateTsFile(pathElement, tsFolder));
                }
            }
        });
        return tsFolder;
    }

}
