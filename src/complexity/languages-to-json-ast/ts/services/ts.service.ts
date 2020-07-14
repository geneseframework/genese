import * as fs from 'fs-extra';
import * as ts from 'typescript';
import { getFilename } from '../../../core/services/file.service';
import { KindAliases } from '../const/kind-aliases';
import { Node, SyntaxKind } from 'ts-morph';

/**
 * Service for operations on TsNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
export class Ts {


    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    static getKindAlias(node: Node): string {
        let kind = node.getKindName();
        for (const alias of KindAliases) {
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    }


    /**
     * Gets the end pos of a node in the AST
     * @param node // The node in the AST
     */
    static getEnd(node: ts.Node): number {
        return node?.end;
    }


    /**
     * Gets the type of a node in the AST (MethodDeclaration, IfStatement, ...)
     * @param node // The node in the AST
     */
    static getKind(node: ts.Node): string {
        return node ? ts.SyntaxKind[node.kind] : '';
    }


    /**
     * Gets the name of the method of a node with type = MethodDeclaration
     * @param node // The AST node
     */
    static getName(node: Node): string {
        switch (node.getKind()) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Parameter:
                return node.compilerNode['name']?.['escapedText'] ?? '';
            case SyntaxKind.Identifier:
                return node.getText();
            default:
                return undefined;
        }
    }


    /**
     * Gets the pos of a node in the AST (ie the getFullStart() which is including spaces and commented lines before the beginning of the node)
     * @param node      // The node in the AST
     */
    static getPosition(node: ts.Node): number {
        return node?.pos;
    }


    /**
     * Gets the typescript JsonAst of a given file
     * @param path      // The absolute path of the file
     */
    static getSourceFile(path: string): ts.SourceFile {
        return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    }


    /**
     * Gets the pos of a node in the AST (ie the getStart() which is not including spaces and commented lines before the beginning of the node)
     * @param node              // The node in the AST
     * @param sourceFile        // The sourceFile of the file containing the AST node
     */
    static getStart(node: ts.Node, sourceFile: ts.SourceFile): number {
        return node.getStart(sourceFile);
    }


    /**
     * Returns the source code of a given file
     * @param path      // The path of the file
     */
    static getTextFile(path: string): string {
        return Ts.getSourceFile(path)?.text;
    }


}
