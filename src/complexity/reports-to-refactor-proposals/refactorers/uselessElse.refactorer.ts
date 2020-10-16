import { MethodDeclaration, Project, SourceFile, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';
import { Refactorer } from '../models/refactorer.model';
import { System } from '../models/system.model';

export class uselessElseRefactorer extends Refactorer {
    prepareSystems(sourceFile: SourceFile, astFile: AstFile): System[] {
        return (
            sourceFile
                ?.getFirstChildByKind(SyntaxKind.ClassDeclaration)
                ?.getChildrenOfKind(SyntaxKind.MethodDeclaration)
                ?.map((n: MethodDeclaration) => new System(n, astFile)) || []
        );
    }
    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @param method the current method
     * @returns {void}
     */
    analyze(method: System): System {
        const FIRST_BLOCK = method.node.getFirstChildByKind(ts.SyntaxKind.Block);
        const IF_STATEMENT = FIRST_BLOCK?.getChildrenOfKind(ts.SyntaxKind.IfStatement)[0];
        const HAS_ELSE_STATEMENT = IF_STATEMENT?.getChildrenOfKind(ts.SyntaxKind.Block)?.length === 2;
        const HAS_RETURN_ON_IF = IF_STATEMENT?.getFirstChildByKind(ts.SyntaxKind.Block)?.getFirstChildByKind(ts.SyntaxKind.ReturnStatement);
        if (IF_STATEMENT && HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF) uselessElseRefactorer.refactor(method);
        return method;
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    private static refactor(method: System): void {
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
        method.refactoredSystem = new System(NODE, method.astFile);
    }
}
