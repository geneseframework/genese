import { Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Refactorer } from '../models/refactorer.model';

export class uselessElseRefactorer extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @param method the current method
     * @returns {void}
     */
    needRefacto(system: Node): boolean {
        const FIRST_BLOCK = system.getFirstChildByKind(ts.SyntaxKind.Block);
        const IF_STATEMENT = FIRST_BLOCK?.getChildrenOfKind(ts.SyntaxKind.IfStatement)[0];
        const HAS_ELSE_STATEMENT = IF_STATEMENT?.getChildrenOfKind(ts.SyntaxKind.Block)?.length === 2;
        const HAS_RETURN_ON_IF = IF_STATEMENT?.getFirstChildByKind(ts.SyntaxKind.Block)?.getFirstChildByKind(ts.SyntaxKind.ReturnStatement);
        return Boolean(IF_STATEMENT && HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF);
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
            if (ts.isIfStatement(node) && node.elseStatement) {
                elseStatement = node.elseStatement.getChildren().map((s) => s.getFullText());
                elseStatement = elseStatement.slice(1, elseStatement.length - 1);
                if (elseStatement[0]) elseStatement[0] = elseStatement[0].replace(/\n/, '');
                return ts.createIf(node.expression, node.thenStatement);
            }
            return node;
        });
        NODE.getFirstDescendantByKind(SyntaxKind.Block)?.addStatements(elseStatement);
        return NODE;
    }
}
