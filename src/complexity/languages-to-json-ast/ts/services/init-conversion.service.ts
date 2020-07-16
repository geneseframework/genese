import * as fs from 'fs-extra';
import { DEV_MOCK, LIMIT_CONVERSIONS } from '../../language-to-json-ast';
import { TsFileGenerationService } from './ts-file-generation.service';
import { getFileExtension, platformPath } from '../../../core/services/file.service';
import { Options } from '../../../core/models/options.model';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { JsonAstInterface } from '../../../core/interfaces/ast/json-ast.interface';

/**
 * - TsFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
export class InitConversionService {


    /**
     * Generates the TsFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     */
    generateAll(path: string): JsonAstInterface {
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
    private generateAstFolder(path: string): AstFolderInterface {
        let tsFolder: AstFolderInterface = {
            path: platformPath(path),
            astFiles: []
        };
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_CONVERSIONS) {
                    tsFolder.children = tsFolder.children ?? [];
                    tsFolder.children.push(this.generateAstFolder(`${pathElement}/`))
                } else if (this.isFileToConvert(pathElement)) {
                    tsFolder.astFiles.push(new TsFileGenerationService().generateTsFile(pathElement, tsFolder));
                }
            }
        });
        return tsFolder;
    }


    /**
     * Returns true if a path corresponds to a file to convert in JsonAst
     * @param path
     */
    private isFileToConvert(path: string): boolean {
        return (getFileExtension(path) === 'ts' && !LIMIT_CONVERSIONS) || path === DEV_MOCK;
    }

}
