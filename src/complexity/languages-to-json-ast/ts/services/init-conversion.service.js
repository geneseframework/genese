"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitConversionService = void 0;
const fs = require("fs-extra");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const ts_file_conversion_service_1 = require("./ts-file-conversion.service");
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
        return {
            astFolder: this.generateAstFolder(path)
        };
    }
    /**
     * Generates the TsFolder corresponding to a given path and to its potential TsFolder parent
     * @param path                  // The path of the TsFolder
     */
    generateAstFolder(path) {
        let tsFolder = {
            path: file_service_1.platformPath(path),
            astFiles: []
        };
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            var _a;
            const pathElement = path + elementName;
            if (!options_model_1.Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !language_to_json_ast_1.LIMIT_CONVERSIONS) {
                    tsFolder.children = (_a = tsFolder.children) !== null && _a !== void 0 ? _a : [];
                    tsFolder.children.push(this.generateAstFolder(`${pathElement}/`));
                }
                else if (this.isFileToConvert(pathElement)) {
                    tsFolder.astFiles.push(new ts_file_conversion_service_1.TsFileConversionService().generateTsFile(pathElement, tsFolder));
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
