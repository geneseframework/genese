"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const ts_folder_model_1 = require("../models/ts-folder.model");
const ts_file_conversion_service_1 = require("./ts-file-conversion.service");
const ts_json_ast_model_1 = require("../models/ts-json-ast.model");
const file_service_1 = require("../../../core/services/file.service");
const options_model_1 = require("../../../core/models/options.model");
/**
 * - TsFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
class InitConversionService {
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
        return tsJsonAst;
    }
    /**
     * Generates the TsFolder corresponding to a given path and to its potential TsFolder parent
     * @param path                  // The path of the TsFolder
     * @param tsFolderParent        // The TsFolder parent
     */
    generateTsFolder(path, tsFolderParent) {
        let tsFolder = new ts_folder_model_1.TsFolder();
        tsFolder.parent = tsFolderParent;
        tsFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            const pathElement = path + elementName;
            if (!options_model_1.Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !language_to_json_ast_1.LIMIT_CONVERSIONS) {
                    tsFolder.children.push(this.generateTsFolder(`${pathElement}/`, tsFolder));
                }
                else if (this.isFileToConvert(pathElement)) {
                    tsFolder.tsFiles.push(new ts_file_conversion_service_1.TsFileConversionService().generateTsFile(pathElement, tsFolder));
                }
            }
        });
        return tsFolder;
    }
    /**
     * Returns true if a path corresponds to a file to convert in JsonAst
     * @param path
     */
    isFileToConvert(path) {
        return (file_service_1.getFileExtension(path) === 'ts' && !language_to_json_ast_1.LIMIT_CONVERSIONS) || path === language_to_json_ast_1.DEV_MOCK;
    }
}
exports.InitConversionService = InitConversionService;
