import * as fs from 'fs-extra';
import { AstFileGenerationJavaService } from './ast-file-generation-java.service';
import { getFileExtension, platformPath } from '../../../core/services/file.service';
import { Options } from '../../../core/models/options.model';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { JsonAstInterface } from '../../../core/interfaces/ast/json-ast.interface';
import { DEV_MOCK, LIMIT_GENERATIONS } from '../../globals.const';

/**
 * - AstFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
export class InitGenerationJavaService {


    /**
     * Generates the AstFolder for a given folder
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
     * Generates the AstFolder corresponding to a given path and to its potential AstFolder parent
     * @param path                  // The path of the AstFolder
     */
    private generateAstFolder(path: string): AstFolderInterface {
        let astFolder: AstFolderInterface = {
            path: platformPath(path),
            astFiles: []
        };
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!Options.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory() && !LIMIT_GENERATIONS) {
                    astFolder.children = astFolder.children ?? [];
                    astFolder.children.push(this.generateAstFolder(`${pathElement}/`))
                } else if (this.isFileToGenerate(pathElement)) {
                    astFolder.astFiles.push(new AstFileGenerationJavaService().generate(pathElement, astFolder));
                }
            } else {
                console.log('ignored file: ', pathElement);
            }
        });
        return astFolder;
    }


    /**
     * Returns true if a path corresponds to a file to generate in JsonAst
     * @param path      // The path of the file
     */
    private isFileToGenerate(path: string): boolean {
        return (getFileExtension(path) === 'java' && !LIMIT_GENERATIONS) || path === DEV_MOCK;
    }

}
