"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitGenerationService = void 0;
const fs = require("fs-extra");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const ast_file_generation_service_1 = require("./ast-file-generation.service");
const file_service_1 = require("../../../core/services/file.service");
const options_model_1 = require("../../../core/models/options.model");
/**
 * - AstFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
class InitGenerationService {
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
        return {
            astFolder: this.generateAstFolder(path)
        };
    }
    /**
     * Generates the AstFolder corresponding to a given path and to its potential AstFolder parent
     * @param path                  // The path of the AstFolder
     */
    generateAstFolder(path) {
        let astFolder = {
            path: file_service_1.platformPath(path),
            astFiles: []
        };
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName) => {
            var _a;
            const pathElement = path + elementName;
            if (!options_model_1.Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !language_to_json_ast_1.LIMIT_CONVERSIONS) {
                    astFolder.children = (_a = astFolder.children) !== null && _a !== void 0 ? _a : [];
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`));
                }
                else if (this.isFileToGenerate(pathElement)) {
                    astFolder.astFiles.push(new ast_file_generation_service_1.AstFileGenerationService().generate(pathElement, astFolder));
                }
            }
        });
        return astFolder;
    }
    /**
     * Returns true if a path corresponds to a file to generate in JsonAst
     * @param path      // The path of the file
     */
    isFileToGenerate(path) {
        return (file_service_1.getFileExtension(path) === 'ts' && !language_to_json_ast_1.LIMIT_CONVERSIONS) || path === language_to_json_ast_1.DEV_MOCK;
    }
}
exports.InitGenerationService = InitGenerationService;
