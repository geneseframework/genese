import * as ts from 'typescript';
import * as utils from 'tsutils';
import { AstNode } from '../models/ast-node.model';

/**
 * Service around complexity calculation
 */
export class CyclomaticComplexityService {


    /**
     * Returns the cyclomatic complexity of an AST node
     * @param astNode
     */
    static calculateCyclomaticComplexity(astNode: AstNode): number {
        let totalComplexity = 1;
        // ts.forEachChild(node, function cb(node) {
        //     if (utils.isFunctionWithBody(node)) {
        //         totalComplexity += 1;
        //         ts.forEachChild(node, cb);
        //     } else {
        //         if (CyclomaticComplexityService.increasesCyclomaticComplexity(node)) {
        //             totalComplexity += 1;
        //         }
        //         ts.forEachChild(node, cb);
        //     }
        // });
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
