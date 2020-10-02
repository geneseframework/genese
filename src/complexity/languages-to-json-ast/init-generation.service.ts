import * as fs from 'fs-extra';
import { AstFileGenerationJavaService } from './java/services/ast-file-generation-java.service';
import { getFileExtension, platformPath } from '../core/services/file.service';
import { Options } from '../core/models/options.model';
import { AstFolderInterface } from '../core/interfaces/ast/ast-folder.interface';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { DEV_MOCK, LIMIT_GENERATIONS } from './globals.const';
import { Language } from '../core/enum/language.enum';
import { AstFileGenerationService } from './java/services/ast-file-generation.service';

/**
 * - AstFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
export class InitGenerationService {

    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param  {string} path    // The path of the folder
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    generateAll(path: string, language: Language): JsonAstInterface {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        return {
            astFolder: this.generateAstFolder(path, language)
        };
    }

    /**
     * Generates the AstFolder corresponding to a given path and to its potential AstFolder parent
     * @param  {string} path              // The path of the AstFolder
     * @param  {Language} language
     * @returns AstFolderInterface
     */
    private generateAstFolder(path: string, language: Language): AstFolderInterface {
        let astFolder: AstFolderInterface = {
            path: platformPath(path),
            astFiles: []
        };
        const initService = language === Language.TS ? new AstFileGenerationService() : new AstFileGenerationJavaService();
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_GENERATIONS) {
                    astFolder.children = astFolder.children ?? [];
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`, language))
                } else if (this.isFileToGenerate(pathElement, language)) {
                    astFolder.astFiles.push(initService.generate(pathElement, astFolder));
                }
            }
        });
        return astFolder;
    }

    /**
     * Returns true if a path corresponds to a file to generate in JsonAst
     * @param  {string} path  // The path of the file
     * @param  {Language} language
     * @returns boolean
     */
    private isFileToGenerate(path: string, language: Language): boolean {
        return (getFileExtension(path) === language && !LIMIT_GENERATIONS) || path === DEV_MOCK;
    }
}
