import { getFilename } from '../../../core/services/file.service';
import { Ts } from './ts.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { project } from '../../language-to-json-ast';
import { createWrappedNode, Identifier, Node, SourceFile, ts } from 'ts-morph';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import * as chalk from 'chalk';

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
            console.log('CPX FACTORSSS', cpxFactors)
        }
        return astNode;
    }


    private getCpxFactors(node: Node): CpxFactors {
        if (node.getKindName() !== SyntaxKind.Identifier) {
            return undefined;
        }
        const identifier = node as Identifier;
        const definition = identifier.getDefinitions()?.[0];
        if (!definition) {
            return undefined;
        }
        console.log(chalk.yellowBright('IDENTIFIER IMPLEMENTATTTSS'), node.getKindName(), Ts.getName(node), definition.getSourceFile().getFilePath());
        // const debugFile = project.getSourceFileOrThrow('debug.mock.ts');
        // console.log('DEBUG FILE', debugFile)
        // const classDeclaration = debugFile.getClasses()[0];
        // // console.log('CLASS FILE', classDeclaration)
        // const referencedSymbols = classDeclaration.findReferences();
        //
        // for (const referencedSymbol of referencedSymbols) {
        //     for (const reference of referencedSymbol.getReferences()) {
        //         console.log("---------")
        //         console.log("REFERENCE")
        //         console.log("---------")
        //         console.log("File path: " + reference.getSourceFile().getFilePath());
        //         console.log("Start: " + reference.getTextSpan().getStart());
        //         console.log("Length: " + reference.getTextSpan().getLength());
        //         console.log("Parent kind: " + reference.getNode().getParentOrThrow().getKindName());
        //         console.log("\n");
        //     }
        // }
        // const ref = classDeclaration.getMethodOrThrow('ref');
        // console.log('METHOD  REF ', ref.getName())
        // const desc  = ref.getDescendantsOfKind(SyntaxKind.Identifier);
        // for (const d of desc) {
        //     console.log(chalk.blueBright('IDENTIFIER', d.getText()), d.getType().getText());
        //     const def = d.getImplementations()[0];
        //     console.log(chalk.yellowBright('IDENTIFIER DEFS'), def?.getTextSpan());
        // }
        const cpxFactors: CpxFactors = undefined;
        // const references = node.findReferences();
        return cpxFactors;
    }

}
