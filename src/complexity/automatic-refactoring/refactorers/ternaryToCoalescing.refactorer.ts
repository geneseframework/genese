import { ConditionalExpression, Expression, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Refactorer } from '../models/refactorer.model';

export class TernaryToNullishCoalescing extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    /**
     * For all ternary expression of a method
     * check if it need refacto
     * @param node the method to check
     * @returns {boolean}
     */
    needRefacto(node: Node): boolean {
        return node.getDescendantsOfKind(SyntaxKind.ConditionalExpression).some((ternary: ConditionalExpression) => {
            const [FIRST_MEMBER, SECOND_MEMBER] = this.getTernaryMembers(ternary as ConditionalExpression);
            return this.areSame(FIRST_MEMBER, SECOND_MEMBER);
        });
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
                const [FIRST_MEMBER, SECOND_MEMBER, THIRD_MEMBER] = this.getTernaryMembers(node as ConditionalExpression);
                if (this.areSame(FIRST_MEMBER, SECOND_MEMBER)) {
                    return ts.createBinary(
                        FIRST_MEMBER.compilerNode as ts.Expression,
                        SyntaxKind.QuestionQuestionToken,
                        THIRD_MEMBER.compilerNode as ts.Expression
                    );
                }
            }
            return node.compilerNode;
        });
    }

    /**
     * Get all three members of a ternary expression
     * @param node the ternary expression
     * @returns {[Node, Node, Node]}
     */
    private getTernaryMembers(node: ConditionalExpression): [Node, Node, Node] {
        let a = node ? node : 'test';
        const CHILDRENS = node.getChildren() || [];
        return [CHILDRENS[0], CHILDRENS[2], CHILDRENS[4]];
    }

    /**
     * Check if two node are the same by checking text and kind
     * @param node1 the first node
     * @param node2 the second node
     * @returns {boolean}
     */
    private areSame(node1: Node, node2: Node): boolean {
        return node1.getText() === node2.getText() && node1.getKind() === node2.getKind();
    }
}
