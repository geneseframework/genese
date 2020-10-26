import { IfStatement, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';
import { RefactorProposal } from '../models/refactor-proposal.model';

import { Refactorer } from '../models/refactorer.model';

export class uselessElseRefactorer extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @param method the current method
     * @returns {void}
     */
    needRefacto(node: Node): boolean {
        return node?.getDescendantsOfKind(SyntaxKind.IfStatement).some((ifStatement: IfStatement) => {
            const BLOCKS = ifStatement.getChildrenOfKind(SyntaxKind.Block) || [];
            const HAS_ELSE_STATEMENT = BLOCKS.length === 2;
            const HAS_RETURN_ON_IF = BLOCKS[0]?.getFirstChildByKind(SyntaxKind.ReturnStatement);
            return Boolean(HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF);
        });
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param system the current method
     * @returns {void}
     */
    refactor(system: Node): Node {
        let elseStatement: string[] = [];
        const NODE = system.transform((traversal: TransformTraversalControl) => {
            const node = traversal.visitChildren();
            if (this.gotSimpleElse(node)) {
                elseStatement = this.prepareElseStatement(node.elseStatement);
                return ts.createIf(node.expression, node.thenStatement);
            }
            return node;
        });
        NODE.getFirstDescendantByKind(SyntaxKind.Block)?.addStatements(elseStatement);
        return NODE;
    }

    /**
     * Check if node is a ifStatement with a simple else inside it
     * @param node the node to check
     * @returns {boolean}
     */
    private gotSimpleElse(node: ts.Node): node is ts.IfStatement {
        return ts.isIfStatement(node) && node.elseStatement && node.elseStatement.kind !== SyntaxKind.IfStatement;
    }

    /**
     * Prepare a statements list from a given else statement
     * @param block the given else statement
     * @returns {string[]}
     */
    private prepareElseStatement(block: ts.Statement): string[] {
        let elseStatement: string[] = block.getChildren().map((s) => s.getFullText());
        elseStatement = elseStatement.slice(1, elseStatement.length - 1);
        if (elseStatement[0]) elseStatement[0] = elseStatement[0].replace(/\n/, '');
        return elseStatement;
    }
}
