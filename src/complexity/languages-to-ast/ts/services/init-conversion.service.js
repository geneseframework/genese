"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const convert_options_model_1 = require("../../core/convert-options.model");
const ast_folder_model_1 = require("../../../core/models/ast/ast-folder.model");
const json_ast_model_1 = require("../../../core/models/ast/json-ast.model");
const ast_file_conversion_service_1 = require("./ast-file-conversion.service");
const main_language_to_ast_1 = require("../../main-language-to-ast");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class InitConversionService {
    constructor() {
        this.jsonAst = new json_ast_model_1.JsonAst();
        this.astFileConversionService = new ast_file_conversion_service_1.AstFileConversionService(); // The service managing TreeFiles
    }
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
        return this.jsonAst;
    }
    generateAstFolder(path, astFolderParent) {
        let astFolder = new ast_folder_model_1.AstFolder();
        astFolder.parent = astFolderParent;
        astFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            console.log('ELTTT', elementName);
            const pathElement = path + elementName;
            if (!convert_options_model_1.ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !main_language_to_ast_1.LIMIT_CONVERSIONS) {
                    console.log('NO LIMITS');
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`, astFolder));
                }
                else if (!main_language_to_ast_1.LIMIT_CONVERSIONS || pathElement === '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.js') {
                    console.log('PATHELTTT', pathElement);
                    astFolder.astFiles.push(this.astFileConversionService.generateAstFile(pathElement, astFolder));
                }
            }
        });
        astFolder.logg();
        return astFolder;
    }
}
exports.InitConversionService = InitConversionService;
