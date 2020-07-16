import { getFilename } from '../../../core/services/file.service';
import { Ts } from './ts.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { project, WEIGHTED_METHODS, WEIGHTS } from '../../language-to-json-ast';
import { DefinitionInfo, Identifier, Node, SourceFile } from 'ts-morph';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { CpxFactorsInterface } from '../../../core/interfaces/cpx-factors.interface';
import * as ts from 'typescript';
import { showDuration } from '../../../main';

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
        // const sourceFile: SourceFile = ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf8'));
        const sourceFile: SourceFile = project.getSourceFileOrThrow(path);
        return {
            name: getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile, sourceFile.compilerNode.getSourceFile())
        };
    }


    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node: Node, sourceFile: ts.SourceFile): AstNodeInterface {
        const start = Date.now();
        // const tsNode = node.compilerNode;
        const astNode: AstNodeInterface = {
            end: node.getEnd(),
            kind: Ts.getKindAlias(node),
            name: Ts.getName(node),
            // name: Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        const type = Ts.getType(node);
        if (type) {
            astNode.type = type;
        }
        // console.log('WEIGHTTTTT', WEIGHTS);
        if (astNode.type === 'function' && WEIGHTED_METHODS.includes(astNode.name)) {
            const cpxFactors: CpxFactorsInterface = this.getCpxFactors(node);
            if (cpxFactors) {
                astNode.cpxFactors = cpxFactors;
            }
        }
        const end = Date.now() - start;
        // if (end > 1)
        //     console.log('DURATIONNN', astNode.kind, astNode.name, end)
        node.forEachChild((childNode: Node) => {
            if (!astNode.children) {
                astNode.children = [];
            }
            astNode.children.push(this.createAstNodeChildren(childNode, sourceFile));
        });
        return astNode;
    }


    private getCpxFactors(node: Node): CpxFactorsInterface {
        if (node.getKindName() !== SyntaxKind.Identifier) {
            return undefined;
        }
        const identifier = node as Identifier;
        // showDuration('BEFORE GET CPX FACTTT')
        // const definition = identifier.getDefinitions()?.[0];
        // showDuration('AFTER GET CPX FACTTT')
        return undefined;
        // return this.useWeight(definition, Ts.getName(node));
    }


    useWeight(definition: DefinitionInfo, nodeName: string): CpxFactorsInterface {
        if (!definition) {
            return undefined;
        }
        const lib = this.library(definition);
        const method = lib ? Object.keys(WEIGHTS[lib]).find(e => e === nodeName) : undefined;
        const useCpx = method ?
            {
                use: {
                    method: WEIGHTS[lib][method]
                }
            }
            : undefined;
        return useCpx;
    }




    // isInTypeScript(definition: DefinitionInfo): boolean {
    //     return this.library(definition.getSourceFile().getFilePath()) === 'TypeScript';
    // }


    // isInTsWeights(name: string): boolean {
    //     console.log('TSWEIGHTS NAMEEEE', name, Object.keys(TsWeights), TsWeights[name.toString()])
    //     return Object.keys(TsWeights).includes(name)
    // }


    // TODO: Refacto
    library(definition: DefinitionInfo): string {
        const path = definition.getSourceFile().getFilePath();
        return path.match(/typescript\/lib/) ? 'typescript' : undefined;
    }

}
