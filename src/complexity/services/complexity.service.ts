import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsTree } from '../models/ts-tree.model';
import { Ast } from './ast.service';

export class ComplexityService {



    static calculateCognitiveComplexity(tsTree: TsTree): number {
        let complexity = 0;
        if (tsTree) {
            for (const tree of tsTree?.children) {
                complexity += ComplexityService.addCognitiveComplexity(tree);
                complexity += ComplexityService.calculateCognitiveComplexity(tree);
            }
        }
        return complexity;
    }


    /**
     * Calculates the cyclomatic complexity of a method
     * @param node: ts.Node
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



    static increaseDepth(node: ts.Node, depth: number): number {
        let newDepth = depth;
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
                newDepth = depth + 1;
                break;
            default:
                break;
        }
        return newDepth;
    }


    static addCognitiveComplexity(tsTree: TsTree): number {
        let complexity = 0;
        if (!tsTree?.node || tsTree?.depth === undefined) {
            return 0;
        }
        if (tsTree?.node?.['elseStatement']) {
            complexity ++;
        }
        switch (tsTree.node.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                complexity += tsTree.depth + 1;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity += ComplexityService.addBinaryCognitiveCpx(tsTree);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ComplexityService.isRecursion(tsTree, tsTree.node)) {
                    complexity++;
                }
                break;
            case ts.SyntaxKind.ConditionalExpression:
                complexity += ComplexityService.conditionalExpressionIsTrivial(tsTree) ? 0 : 1;
                break;
            default:
                complexity += 0;
        }
        return complexity;
    }


    static conditionalExpressionIsTrivial(tsTree: TsTree): boolean {
        return (ComplexityService.isLiteral(tsTree?.node?.['whenTrue']) && ComplexityService.isLiteral(tsTree?.node?.['whenFalse']));
    }


    static isLiteral(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.StringLiteral
            || node?.kind === ts.SyntaxKind.NumericLiteral
            || node?.kind === ts.SyntaxKind.TrueKeyword
            || node?.kind === ts.SyntaxKind.FalseKeyword;
    }


    static isRecursion(tsTree: TsTree, node: ts.Node): boolean {
        return node?.['name']?.['escapedText'] === tsTree?.tsMethod?.name;
    }


    static addBinaryCognitiveCpx(tsTree: TsTree): number {
        if (!tsTree?.node || !tsTree.parent.node) {
            return 0;
        }
        let complexity = 0;
        if (Ast.isBinary(tsTree.node) && Ast.isLogicDoor(tsTree.node)) {
            complexity = (Ast.isSameOperatorToken(tsTree.node, tsTree.parent.node) && !Ast.isOrTokenBetweenBinaries(tsTree.node)) ? 0 : 1;
        }
        return complexity;
    }


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


    static increasesCognitiveComplexity(tsTree: TsTree): boolean {

        if (tsTree?.node?.['elseStatement']) {
            return true;
        }
        switch (tsTree?.node?.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                return ComplexityService.addBinaryCognitiveCpx(tsTree) > 0;
            case ts.SyntaxKind.ConditionalExpression:
                return !ComplexityService.conditionalExpressionIsTrivial(tsTree);
            default:
                return false;
        }
    }
}
