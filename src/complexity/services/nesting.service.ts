import * as ts from 'typescript';
import { TreeNode } from '../models/tree-node.model';

export class NestingService {

    /**
     * Returns the nesting (the nesting) of a "block" inside a given AST node
     * For example, if on a given line the nesting is equal to 5 and if the next line is an IfStatement, the block inside the "if" will have a nesting equal to 6.
     * @param treeNode
     */
    getNesting(treeNode: TreeNode): number {
        if (!treeNode || !treeNode.node) {
            return 0;
        }
        let nesting = treeNode?.parent?.nesting ?? 0;
        switch (treeNode.node.parent.kind) {
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
                nesting++;
                break;
            default:
                break;
        }
        return nesting;
    }

}
