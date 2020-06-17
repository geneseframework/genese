import * as fs from 'fs-extra';
import { ConvertOptions } from '../../core/convert-options.model';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { JsonAst } from '../../../core/models/ast/json-ast.model';
import { AstFileConversionService } from './ast-file-conversion.service';
import { LIMIT_CONVERSIONS } from '../../main-language-to-ast';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class InitConversionService {


    jsonAst?: JsonAst = new JsonAst();

    astFileConversionService?: AstFileConversionService = new AstFileConversionService();  // The service managing TreeFiles

    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateAll(path: string): JsonAst {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        this.jsonAst.astFolder = this.generateAstFolder(path);
        return this.jsonAst;
    }


    private generateAstFolder(path: string, astFolderParent?: AstFolder): AstFolder {
        let astFolder = new AstFolder();
        astFolder.parent = astFolderParent;
        astFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            console.log('ELTTT', elementName)
            const pathElement = path + elementName;
            if (!ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_CONVERSIONS) {
                    console.log('NO LIMITS')
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`, astFolder))
                } else if (!LIMIT_CONVERSIONS || pathElement === '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.js') {
                    console.log('PATHELTTT', pathElement)
                    astFolder.astFiles.push(this.astFileConversionService.generateAstFile(pathElement, astFolder));
                }
            }
        });
        astFolder.logg()
        return astFolder;
    }

}
