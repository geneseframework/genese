import * as fs from 'fs-extra';
import { ConvertOptions } from '../../core/convert-options.model';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { JsonAst } from '../../../core/models/ast/json-ast.model';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { AstFileService } from './ast-file.service';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class InitConversionService {


    jsonAst?: JsonAst = new JsonAst();

    astFileService?: AstFileService = new AstFileService();  // The service managing TreeFiles
    // treeFolder: TreeFolder = undefined;                         // The AstFolder corresponding to this service

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
        // this.jsonAst.astFolder = new AstFolder();
        return this.jsonAst;
    }


    private generateAstFolder(path: string, astFolderParent?: AstFolder): AstFolder {
        let astFolder = new AstFolder();
        astFolder.parent = astFolderParent;
        astFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory()) {
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`, astFolder))
                }
                astFolder.astFiles.push(this.astFileService.generateAstFile(pathElement, astFolder));
            }
        });
        astFolder.logg()
        return astFolder;
    }

    /**
     * Generates the AstFolder of a treeSubFolder which is a child of a given treeFolder with the path 'pathElement'
     * @param pathElement       // The path of the element
     * @param language          // The language of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The AstFolder of a subfolder of the param treeFolder
     * @param treeFolder        // The parent AstFolder
     */
    // private generateFileOrDirTree(pathElement: string, treeSubFolder: TreeFolder, treeFolder: TreeFolder): void {
    //     if (fs.statSync(pathElement).isDirectory()) {
    //         let subFolder = new AstFolder();
    //         subFolder = this.generateAll(`${pathElement}/`, subFolder);
    //         subFolder.parent = treeSubFolder;
    //         subFolder.path = pathElement;
    //         treeFolder.subFolders.push(subFolder);
    //     } else if (!language || getLanguageExtensions(language).includes(getFileExtension(pathElement))) {
    //         if (!DEBUG || (DEBUG && pathElement === './src/complexity/mocks/debug.mock.ts')) {
    //             treeFolder.treeFiles.push(this.treeFileService.generateTree(pathElement, treeFolder));
    //         }
    //     }
    // }



}
