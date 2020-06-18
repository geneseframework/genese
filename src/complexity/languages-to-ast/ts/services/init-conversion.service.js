"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const convert_options_model_1 = require("../../core/models/convert-options.model");
const main_language_to_ast_1 = require("../../main-language-to-ast");
const ts_folder_model_1 = require("../models/ts-folder.model");
const ts_file_conversion_service_1 = require("./ts-file-conversion.service");
const ts_json_ast_model_1 = require("../models/ts-json-ast.model");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class InitConversionService {
    constructor() {
        this.tsFileConversionService = new ts_file_conversion_service_1.TsFileConversionService(); // The service managing TreeFiles
    }
    /**
     * Generates the TsFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateAll(path) {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        const tsJsonAst = new ts_json_ast_model_1.TsJsonAst();
        tsJsonAst.tsFolder = this.generateTsFolder(path);
        // tsJsonAst.tsFolder.logg();
        // console.log('GENERATE ALLLL', tsJsonAst.tsFolder?.path)
        return tsJsonAst;
    }
    generateTsFolder(path, astFolderParent) {
        let tsFolder = new ts_folder_model_1.TsFolder();
        tsFolder.parent = astFolderParent;
        tsFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            const pathElement = path + elementName;
            if (!convert_options_model_1.ConvertOptions.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !main_language_to_ast_1.LIMIT_CONVERSIONS) {
                    tsFolder.children.push(this.generateTsFolder(`${pathElement}/`, tsFolder));
                }
                else if (!main_language_to_ast_1.LIMIT_CONVERSIONS || pathElement === '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.js') {
                    tsFolder.tsFiles.push(this.tsFileConversionService.generateTsFile(pathElement, tsFolder));
                }
            }
        });
        return tsFolder;
    }
}
exports.InitConversionService = InitConversionService;
