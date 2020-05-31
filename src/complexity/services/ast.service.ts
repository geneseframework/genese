import * as fs from 'fs-extra';
import * as ts from 'typescript';
import { getFilename } from './file.service';
import { NodeFeature } from '../enums/node-feature.enum';
import { cpxFactors } from '../cpx-factors';
import { CpxFactors } from '../models/cpx-factors.model';

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


    // ------------------------------------------------------------------------------------------------
    // -------------------------------------   NODE FEATURE   -----------------------------------------
    // ------------------------------------------------------------------------------------------------


    static getNodeFeature(node: ts.Node): NodeFeature {
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.TrueKeyword:
                return NodeFeature.BASIC;
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyAccessExpression:
                return NodeFeature.EMPTY;
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.MethodDeclaration:
                return NodeFeature.FUNC;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WhileStatement:
                return NodeFeature.LOOP;
            default:
                return NodeFeature.BASIC;
        }
    }

    static getCpxFactors(nodeFeature: NodeFeature): CpxFactors {
        const cpxFact = new CpxFactors();
        cpxFact.basic.node = nodeFeature === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
        switch (nodeFeature) {
            case NodeFeature.BASIC:
                break;
            case NodeFeature.CONDITIONAL:
                cpxFact.nesting.conditional = cpxFactors.nesting.conditional;
                cpxFact.structural.conditional = cpxFactors.structural.conditional;
                break;
            case NodeFeature.FUNC:
                cpxFact.nesting.func = cpxFactors.nesting.func;
                cpxFact.structural.func = cpxFactors.structural.func;
                break;
            case NodeFeature.LOOP:
                cpxFact.nesting.loop = cpxFactors.nesting.loop;
                cpxFact.structural.loop = cpxFactors.structural.loop;
                break;
        }
        return cpxFact;
    }


    static getAggregationCpx(nodeFeature: NodeFeature): number {
        return cpxFactors.aggregation[nodeFeature] ?? 0;
    }


    static getNestingCpx(nodeFeature: NodeFeature): number {
        return cpxFactors.nesting[nodeFeature] ?? 0;
    }


    static getStructuralCpx(nodeFeature: NodeFeature): number {
        return cpxFactors.structural[nodeFeature] ?? 0;
    }
}
