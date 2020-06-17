import * as fs from 'fs-extra';
import { ConvertOptions } from '../../core/convert-options.model';
import { LIMIT_CONVERSIONS } from '../../main-language-to-ast';
import { TsFolder } from '../models/ts-folder.model';
import { TsFileConversionService } from './ts-file-conversion.service';
import { TsJsonAst } from '../models/ts-ast.model';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class InitConversionService {


    tsFileConversionService?: TsFileConversionService = new TsFileConversionService();  // The service managing TreeFiles

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
        const jsonAst = new TsJsonAst();
        jsonAst.tsFolder = this.generateTsFolder(path);
        return jsonAst;
    }


    private generateTsFolder(path: string, astFolderParent?: TsFolder): TsFolder {
        let tsFolder = new TsFolder();
        tsFolder.parent = astFolderParent;
        tsFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_CONVERSIONS) {
                    tsFolder.children.push(this.generateTsFolder(`${pathElement}/`, tsFolder))
                } else if (!LIMIT_CONVERSIONS || pathElement === '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.js') {
                    tsFolder.astFiles.push(this.tsFileConversionService.generateTsFile(pathElement, tsFolder));
                }
            }
        });
        tsFolder.logg()
        return tsFolder;
    }

}
