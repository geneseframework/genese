"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const convert_options_model_1 = require("../../core/convert-options.model");
const ast_folder_model_1 = require("../../../core/models/ast/ast-folder.model");
const json_ast_model_1 = require("../../../core/models/ast/json-ast.model");
const ast_file_service_1 = require("./ast-file.service");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class InitConversionService {
    constructor() {
        this.jsonAst = new json_ast_model_1.JsonAst();
        this.astFileService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
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
    // treeFolder: TreeFolder = undefined;                         // The AstFolder corresponding to this service
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateAll(path) {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        this.jsonAst.astFolder = this.generateAstFolder(path);
        // this.jsonAst.astFolder = new AstFolder();
        return this.jsonAst;
    }
    generateAstFolder(path, astFolderParent) {
        let astFolder = new ast_folder_model_1.AstFolder();
        astFolder.parent = astFolderParent;
        astFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            const pathElement = path + elementName;
            if (!convert_options_model_1.ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory()) {
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`, astFolder));
                }
                astFolder.astFiles.push(this.astFileService.generateAstFile(pathElement, astFolder));
            }
        });
        astFolder.logg();
        return astFolder;
    }
}
exports.InitConversionService = InitConversionService;
