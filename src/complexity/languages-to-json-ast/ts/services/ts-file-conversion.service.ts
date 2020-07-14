import { getFilename } from '../../../core/services/file.service';
import { Ts } from './ts.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { project } from '../../language-to-json-ast';
import { createWrappedNode, DefinitionInfo, Identifier, Node, SourceFile, ts } from 'ts-morph';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import * as chalk from 'chalk';
import { TsWeights } from '../ts-weights.enum';

/**
 * - TsFiles generation from their Abstract Syntax Tree (AST)
 */
export class TsFileConversionService {


    /**
     * Generates the TsFile corresponding to a given path and a given TsFolder
     * @param path          // The path of the file
     * @param astFolder     // The TsFolder containing the TsFile
     */
    generateTsFile(path: string, astFolder: AstFolderInterface): AstFileInterface {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const sourceFile: SourceFile = project.getSourceFileOrThrow(path);
        return {
            name: getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile)
        };
    }


    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node: Node): AstNodeInterface {
        const children: AstNodeInterface[] = [];
        node.forEachChild((childNode: Node) => {
            children.push(this.createAstNodeChildren(childNode));
        });
        const astNode: AstNodeInterface = {
            end: node.getEnd(),
            kind: Ts.getKindAlias(node),
            name: Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        if (Ts.getType(node)) {
            astNode.type = Ts.getType(node);
        }
        if (children.length > 0) {
            astNode.children = children;
        }
        if (astNode.type === 'function') {
            const cpxFactors = this.getCpxFactors(node);
            if (cpxFactors) {
                astNode.cpxFactors = cpxFactors;
            }
        }
        return astNode;
    }


    private getCpxFactors(node: Node): any {
        if (node.getKindName() !== SyntaxKind.Identifier) {
            return undefined;
        }
        const identifier = node as Identifier;
        const definition = identifier.getDefinitions()?.[0];
        if (!definition) {
            return undefined;
        }
        if (this.isInTypeScript(definition) && this.isInTsWeights(Ts.getName(node))) {
            return {
                use: {
                    method: TsWeights[Ts.getName(node)]
                }
            };
        }
        return undefined;
    }


    isInTypeScript(definition: DefinitionInfo): boolean {
        return this.library(definition.getSourceFile().getFilePath()) === 'TypeScript';
    }


    isInTsWeights(name: string): boolean {
        return TsWeights[name]
    }


    // TODO: Refacto
    library(path: string): string {
        return path.match(/typescript\/lib/) ? 'TypeScript' : undefined;
    }

}
