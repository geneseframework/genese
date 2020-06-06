import * as fs from 'fs-extra';
import * as ts from 'typescript';
import { getFilename } from './file.service';

/**
 * Service for operations on TreeNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
export class Ast {


    /**
     * Gets the typescript SourceFile of a given file
     * @param path // The absolute path of the file
     */
    static getSourceFile(path: string): ts.SourceFile {
        return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    }


    /**
     * Gets the type of a node in the AST (MethodDeclaration, IfStatement, ...)
     * @param node // The node in the AST
     */
    static getType(node: ts.Node): string {
        return node ? ts.SyntaxKind[node.kind] : '';
    }


    /**
     * Gets the name of the method of a node with type = MethodDeclaration
     * @param node // The AST node
     */
    static getMethodName(node: ts.Node): string {
        if (Ast.isFunctionOrMethod(node)) {
            return node?.['name']?.['escapedText'] ?? '';
        } else {
            return '';
        }
    }


    /**
     * Returns the number of AST nodes which are children of a given AST node
     * @param node
     */
    static getNodeCount(node: ts.Node): number {
        let count = 0;
        ts.forEachChild(node, function cb(childNode) {
            count++
            ts.forEachChild(childNode, cb);
        });
        return count;
    }


    // ------------------------------------------------------------------------------------------------
    // -------------------------------------   TYPE CHECKS   ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    /**
     * Checks if an AST node is a BinaryExpression
     * @param node // The AST node
     */
    static isBinary(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.BinaryExpression ?? false;
    }


    /**
     * Checks if an AST node is a logic door (ie : || or &&)
     * @param node // The AST node to check
     */
    static isLogicDoor(node: ts.Node): boolean {
        return (node?.['operatorToken']?.kind === ts.SyntaxKind.AmpersandAmpersandToken
            || node?.['operatorToken']?.kind === ts.SyntaxKind.BarBarToken)
            ?? false;
    }


    /**
     * Checks if an AST node is "||" anf if this node is between two binary expressions
     * @param node
     */
    static isOrTokenBetweenBinaries(node: ts.Node): boolean {
        return (node?.['operatorToken']?.kind === ts.SyntaxKind.BarBarToken
            && node?.['left']?.kind === ts.SyntaxKind.BinaryExpression
            && node?.['right']?.kind === ts.SyntaxKind.BinaryExpression)
            ?? false;
    }


    /**
     * Checks if two AST nodes have the same type
     * @param firstNode   // The first AST node
     * @param secondNode  // The second AST node
     */
    static isSameOperatorToken(firstNode: ts.Node, secondNode: ts.Node): boolean {
        return firstNode?.['operatorToken']?.kind === secondNode?.['operatorToken']?.kind ?? false;
    }


    /**
     * Checks if an AST node is a function or a method
     * @param node
     */
    static isFunctionOrMethod(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.MethodDeclaration || node?.kind === ts.SyntaxKind.FunctionDeclaration || false;
    }


    /**
     * Checks if an AST node of type ConditionalExpression (a ternary expression) is trivial, ie if the true case and the false case are only some literals
     * @param node      // The node to analyse
     */
    static isTrivialTernary(node: ts.Node): boolean {
        return (Ast.isBasic(node?.['whenTrue']) && Ast.isBasic(node?.['whenFalse']));
    }


    /**
     * Checks if an AST node is a primitive (a string, a number or a boolean)
     * @param node      // The node to analyse
     */
    static isBasic(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.StringLiteral
            || node?.kind === ts.SyntaxKind.NumericLiteral
            || node?.kind === ts.SyntaxKind.TrueKeyword
            || node?.kind === ts.SyntaxKind.FalseKeyword;
    }


    /**
     * Checks if an AST node is a Block which is a "else"
     * @param node      // The node to analyse
     */
    static isElseStatement(node: ts.Node): boolean {
        return (Ast.isBlock(node)
            && node?.parent?.kind === ts.SyntaxKind.IfStatement
            && node?.parent['elseStatement']?.pos === node?.pos);
    }


    /**
     * Checks if an AST node is a IfStatement which is an "else if"
     * @param node      // The node to analyse
     */
    static isElseIfStatement(node: ts.Node): boolean {
        return (node?.kind === ts.SyntaxKind.IfStatement && node?.parent?.kind === ts.SyntaxKind.IfStatement);
    }


    /**
     * Checks if an AST node is a Block which is a "else"
     * @param node      // The node to analyse
     */
    static isBlock(node: ts.Node): boolean {
        return (node?.kind === ts.SyntaxKind.Block);
    }


    static isArrayOfArray(node: ts.Node): boolean {
        return(node?.parent?.kind === ts.SyntaxKind.ElementAccessExpression && node?.kind === ts.SyntaxKind.ElementAccessExpression);
    }


    static isArrayIndex(node: ts.Node): boolean {
        return(node?.parent?.kind === ts.SyntaxKind.ElementAccessExpression && node?.pos === node.parent['argumentExpression'].pos);
    }

}
