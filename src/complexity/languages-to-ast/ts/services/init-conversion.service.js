"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const convert_options_model_1 = require("../../core/convert-options.model");
const ast_folder_model_1 = require("../../../ast-to-reports/models/ast/ast-folder.model");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class InitConversionService {
    // treeFileService?: TreeFileService = new TreeFileService();  // The service managing TreeFiles
    // treeFolder: TreeFolder = undefined;                         // The AstFolder corresponding to this service
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateTree(path, astFolder) {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        const folder = new ast_folder_model_1.AstFolder();
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            const pathElement = path + elementName;
            if (!convert_options_model_1.ConvertOptions.isIgnored(pathElement)) {
                console.log('PATHELEMENTTT', pathElement);
                // this.generateFileOrDirTree(pathElement, treeSubFolder, treeFolder);
            }
        });
        return folder;
    }
}
exports.InitConversionService = InitConversionService;
