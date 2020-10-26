import { ConditionalExpression, createWrappedNode, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Refactorer } from '../models/refactorer.model';

export class TernaryToNullishCoalescing extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    needRefacto(node: Node): boolean {
        let needRefacto = false;
        const TERNARY_EXPRESSIONS = node.getDescendantsOfKind(SyntaxKind.ConditionalExpression);
        TERNARY_EXPRESSIONS.forEach((ternary: ConditionalExpression) => {
            const COUNT = ternary.getChildCount();
            if (ts.isConditionalExpression(ternary.compilerNode) && COUNT > 0) {
                const FIRST_MEMBER = ternary.getChildAtIndex(0);
                const SECOND_MEMBER = ternary.getChildAtIndex(2);
                let test = FIRST_MEMBER ? FIRST_MEMBER : SECOND_MEMBER;
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    needRefacto = true;
                }
            }
        });
        return needRefacto;
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    refactor(system: Node): Node {
        return system.transform((traversal: TransformTraversalControl) => {
            let node: Node = Refactorer.wrapCurrentNode(system, traversal);
            if (ts.isConditionalExpression(node.compilerNode)) {
                const FIRST_MEMBER = node.getChildAtIndex(0);
                const SECOND_MEMBER = node.getChildAtIndex(2);
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    const THIRD_MEMBER = node.getChildAtIndex(4);
                    return ts.createBinary(
                        FIRST_MEMBER.compilerNode as ts.Identifier,
                        SyntaxKind.QuestionQuestionToken,
                        THIRD_MEMBER.compilerNode as ts.Identifier
                    );
                }
            }
            return node.compilerNode;
        });
    }
}
