import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TreeNode } from '../models/tree-node.model';
import { Ast } from './ast.service';
import { CognitiveCpxByIncrementType } from '../models/cognitive-cpx-by-increment-type.model';

/**
 * Service around complexity calculation
 */
export class ComplexityService {


    // ---------------------------------------------------------------------------------------------------------
    //                                          Cognitive complexity
    // ---------------------------------------------------------------------------------------------------------

    /**
     * Returns the cognitive complexity of a TreeNode (the total of complexities of himself and its children)
     * @param tree      // The TreeNode to analyse
     */
    static getCognitiveCpx(tree: TreeNode): number {
        let complexity = 0;
        if (tree) {
            for (const child of tree?.children) {
                complexity += ComplexityService.getTreeCognitiveCpx(child);
                complexity += ComplexityService.getCognitiveCpx(child);
            }
        }
        return complexity;
    }


    /**
     * Returns the cognitive complexity of a TreeNode himself (not its children)
     * @param tree      // The TreeNode to analyse
     */
    static getTreeLocalCognitiveCpx(tree: TreeNode): CognitiveCpxByIncrementType {
        let complexity = new CognitiveCpxByIncrementType();
        if (!tree?.node || tree?.nesting === undefined) {
            return complexity;
        }
        if (tree?.node?.['elseStatement']) {
            complexity.breakFlow = 1;
        }
        switch (tree.node.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                complexity.breakFlow = 1;
                complexity.nesting = tree.nesting;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity.breakFlow += ComplexityService.addBinaryCognitiveCpx(tree);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ComplexityService.isRecursion(tree, tree.node)) {
                    complexity.breakFlow = 1;
                }
                break;
            case ts.SyntaxKind.ConditionalExpression:
                complexity.breakFlow += ComplexityService.conditionalExpressionIsTrivial(tree.node) ? 0 : 1;
                break;
            default:
                break;
        }
        return complexity;
    }


    /**
     * Returns the cognitive complexity of a TreeNode himself (not its children)
     * @param tree      // The TreeNode to analyse
     */
    static getTreeCognitiveCpx(tree: TreeNode): number {
        let complexity = 0;
        if (!tree?.node || tree?.nesting === undefined) {
            return 0;
        }
        if (tree?.node?.['elseStatement']) {
            complexity ++;
        }
        switch (tree.node.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                complexity += tree.nesting + 1;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity += ComplexityService.addBinaryCognitiveCpx(tree);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ComplexityService.isRecursion(tree, tree.node)) {
                    complexity++;
                }
                break;
            case ts.SyntaxKind.ConditionalExpression:
                complexity += ComplexityService.conditionalExpressionIsTrivial(tree.node) ? 0 : 1;
                break;
            default:
                complexity += 0;
        }
        return complexity;
    }


    /**
     * Checks if the AST node of a TreeNode increases the cognitive complexity
     * @param tree        // The TreeNode to check
     */
    static increaseBreakFlow(tree: TreeNode): boolean {
        if (tree?.node?.['elseStatement']) {
            return true;
        }
        switch (tree?.node?.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                return ComplexityService.addBinaryCognitiveCpx(tree) > 0;
            case ts.SyntaxKind.ConditionalExpression:
                return !ComplexityService.conditionalExpressionIsTrivial(tree.node);
            default:
                return false;
        }
    }


    /**
     * Returns the nesting (the nesting) of a "block" inside a given AST node
     * For example, if on a given line the nesting is equal to 5 and if the next line is an IfStatement, the block inside the "if" will have a nesting equal to 6.
     * @param node          // The node to check
     * @param nesting       // The nesting of the parent of the node
     */
    static getNesting(node: ts.Node, nesting: number): number {
        let newNesting = nesting;
        switch (node?.parent.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                newNesting = nesting + 1;
                break;
            default:
                break;
        }
        return newNesting;
    }


    /**
     * Checks if an AST node of type ConditionalExpression (a ternary expression) is trivial, ie if the true case and the false case are only some literals
     * @param node      // The node to analyse
     */
    static conditionalExpressionIsTrivial(node: ts.Node): boolean {
        return (ComplexityService.isLiteral(node?.['whenTrue']) && ComplexityService.isLiteral(node?.['whenFalse']));
    }


    /**
     * Checks if an AST node is a primitive (a string, a number or a boolean)
     * @param node      // The node to analyse
     */
    static isLiteral(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.StringLiteral
            || node?.kind === ts.SyntaxKind.NumericLiteral
            || node?.kind === ts.SyntaxKind.TrueKeyword
            || node?.kind === ts.SyntaxKind.FalseKeyword;
    }


    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The param "tree" must be a TreeNode which is a descendant of a method (ie a TreeNode with node of type MethodDescription)
     * @param tree      // The tree (inside a method)
     * @param node      // The node to analyse (a recursion or not)
     */
    static isRecursion(tree: TreeNode, node: ts.Node): boolean {
        return node?.['name']?.['escapedText'] === tree?.treeMethod?.name;
    }


    /**
     * Increases the cognitive complexity when there is a binary succeeding to a binary of different type
     * For example, the second && is not increasing the cognitive complexity :
     *      if (a && b && c)
     * but in the next example, the || will increase it because it succeeds to a binary of different type (a &&)
     *      if (a && b || c)
     * @param tree      // The TreeNode to analyse
     */
    static addBinaryCognitiveCpx(tree: TreeNode): number {
        if (!tree?.node || !tree.parent.node) {
            return 0;
        }
        let complexity = 0;
        if (Ast.isBinary(tree.node) && Ast.isLogicDoor(tree.node)) {
            complexity = (Ast.isSameOperatorToken(tree.node, tree.parent.node) && !Ast.isOrTokenBetweenBinaries(tree.node)) ? 0 : 1;
        }
        return complexity;
    }


    // ---------------------------------------------------------------------------------------------------------
    //                                          Cyclomatic complexity
    // ---------------------------------------------------------------------------------------------------------


    /**
     * Returns the cyclomatic complexity of an AST node
     * @param node      // The AST node
     */
    static calculateCyclomaticComplexity(node: ts.Node): number {
        let totalComplexity = 1;
        ts.forEachChild(node, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                totalComplexity += 1;
                ts.forEachChild(node, cb);
            } else {
                if (ComplexityService.increasesCyclomaticComplexity(node)) {
                    totalComplexity += 1;
                }
                ts.forEachChild(node, cb);
            }
        });
        return totalComplexity;
    }


    /**
     * Increases the cyclomatic complexity when the AST node must increase it
     * @param node      // The AST node
     */
    static increasesCyclomaticComplexity(node) {
        switch (node.kind) {
            case ts.SyntaxKind.CaseClause:
                return (node).statements.length > 0;
            case ts.SyntaxKind.QuestionDotToken:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                switch ((node).operatorToken.kind) {
                    case ts.SyntaxKind.BarBarToken:
                    case ts.SyntaxKind.AmpersandAmpersandToken:
                        return true;
                    default:
                        return false;
                }
            case ts.SyntaxKind.ConditionalExpression:
            default:
                return false;
        }
    }
}
