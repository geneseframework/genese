import { Project, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Method } from '../models/method.model';

export class MethodRefactorerService {
    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @param method the current method
     * @returns {void}
     */
    static analyze(method: Method): void {
        const FIRST_BLOCK = method.node.getFirstChildByKind(ts.SyntaxKind.Block);
        const IF_STATEMENT = FIRST_BLOCK?.getChildrenOfKind(ts.SyntaxKind.IfStatement)[0];
        const HAS_ELSE_STATEMENT = IF_STATEMENT?.getChildrenOfKind(ts.SyntaxKind.Block)?.length === 2;
        const HAS_RETURN_ON_IF = IF_STATEMENT?.getFirstChildByKind(ts.SyntaxKind.Block)?.getFirstChildByKind(ts.SyntaxKind.ReturnStatement);
        if (IF_STATEMENT && HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF) this.refactor(method);
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    private static refactor(method: Method): void {
        let elseStatement: string[] = [];
        const NODE_COPY = new Project().createSourceFile('test.ts', method.node.getFullText());
        const NODE = NODE_COPY.transform((traversal: TransformTraversalControl) => {
            const node = traversal.visitChildren();
            if (ts.isIfStatement(node) && node.elseStatement) {
                elseStatement = node.elseStatement.getChildren().map((s) => s.getFullText());
                elseStatement = elseStatement.slice(1, elseStatement.length - 1);
                if (elseStatement[0]) elseStatement[0] = elseStatement[0].replace(/\n/, '');
                return ts.createIf(node.expression, node.thenStatement);
            }
            return node;
        });
        NODE.getFirstDescendantByKind(SyntaxKind.Block).addStatements(elseStatement);
        NODE.formatText();
        method.refactoredMethod = new Method(NODE, method.astFile);
    }
}
