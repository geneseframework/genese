import { Block, Identifier, IfStatement, Node, SyntaxKind, TransformTraversalControl, ts, TypeNode } from 'ts-morph';

import { Input } from '../models/input.model';
import { Refactorer } from '../models/refactorer.model';
import { RefactorerUtils } from '../utils/refactorer.utils';

export class BigIfElseRefactorer extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    /**
     * Check if methods blocks got more than 5 statements
     * @param node the method to check
     * @returns {boolean}
     */
    needRefacto(node: Node): boolean {
        return node.getDescendantsOfKind(SyntaxKind.IfStatement).some((i: IfStatement) => {
            const BLOCKS = i.getDescendantsOfKind(SyntaxKind.Block);
            return BLOCKS.some((b: Block) => b.compilerNode.statements.length > 5);
        });
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    refactor(method: Node): Node {
        let methods = [];
        let parameters: Input[] = [];
        let inputs: Input[] = [];
        const NODE = method.transform((traversal: TransformTraversalControl) => {
            let node: Node = Refactorer.wrapCurrentNode(method, traversal);
            this.catchInputs(node, inputs);
            if (this.isConditionnedBlock(node.compilerNode)) {
                node.getDescendantsOfKind(SyntaxKind.VariableStatement).forEach((s) => {
                    const IDENTIFIER: string = s.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
                    inputs = inputs.filter((i) => i.identifier !== IDENTIFIER);
                });

                this.keepOnlyParameters(node, inputs, parameters);

                const METHOD_NAME = `methodToRename${methods.length}`;
                const PARAMETERS = parameters.map(({ identifier, type }) => RefactorerUtils.createSimpleParameter(identifier, type));
                const PARAMETERS_AS_EXPRESSION = parameters.map(({ identifier }: Input) => ts.createIdentifier(identifier));
                const NEW_METHOD = RefactorerUtils.createSimpleMethod(METHOD_NAME, node.compilerNode, PARAMETERS);
                const CONTAIN_RETURN = node.compilerNode.statements.find((s) => s.kind === ts.SyntaxKind.ReturnStatement);
                const METHOD_CALL = RefactorerUtils.createMethodCall(METHOD_NAME, PARAMETERS_AS_EXPRESSION);

                methods.push(NEW_METHOD);
                return ts.createBlock(CONTAIN_RETURN ? [ts.createReturn(METHOD_CALL)] : [ts.createExpressionStatement(METHOD_CALL)]);
            }
            return node.compilerNode;
        });

        this.addMethodToClass(NODE, methods);
        return NODE;
    }

    /**
     * Add transformer to the current class to add externalised methods to it
     * @param node the reactoref method
     * @param methods the externalised methods
     * @returns {void}
     */
    private addMethodToClass(node: Node, methods: ts.MethodDeclaration[]): void {
        this.addTransformer({
            node: node.getParent(),
            transformer: (traversal: TransformTraversalControl) => {
                const NODE = traversal.visitChildren();
                if (ts.isClassDeclaration(NODE)) {
                    const METHODS = NODE.members.concat(...methods);
                    return ts.createClassDeclaration([], [], NODE.name, [], [], METHODS);
                }
                return NODE;
            },
        });
    }

    /**
     * Filter inputs to get only those which are parameters
     * @param node the node
     * @param inputs the inputs array
     * @param parameters the parameter array
     * @returns {void}
     */
    private keepOnlyParameters(node: Node, inputs: Input[], parameters: Input[]): void {
        const IDENTIFIERS = node.getDescendantsOfKind(SyntaxKind.Identifier).map((i: Identifier) => i.getFullText()) || [];
        const PARAMETERS = inputs.filter((i: Input) => IDENTIFIERS.includes(i.identifier) && !parameters.includes(i));
        parameters.push(...PARAMETERS);
    }

    /**
     * Check if a node is an input and memorize it
     * @param node the node to check
     * @param inputs the inputs array
     * @returns {void}
     */
    private catchInputs(node: Node, inputs: Input[]): void {
        if (this.isInputs(node.compilerNode)) {
            const IDENTIFIER: string = node.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
            const TYPE: ts.TypeNode = node?.compilerNode.type;
            if (!inputs.some((i) => i.identifier === IDENTIFIER)) {
                inputs.push({ identifier: IDENTIFIER, type: TYPE, isParameter: false });
            }
        }
    }

    /**
     * Check if a block is in if statement and if it need refacto
     * @param node the node to check
     * @returns {boolean}
     */
    private isConditionnedBlock(node: ts.Node): node is ts.Block {
        return node.parent && ts.isIfStatement(node.parent) && ts.isBlock(node) && node.statements.length > 5;
    }

    /**
     * Check if a node can be concered as input
     * @param node the node to check
     * @returns {boolean}
     */
    private isInputs(node: ts.Node): node is ts.ParameterDeclaration | ts.VariableDeclaration {
        return (ts.isParameter(node) && !ts.isArrowFunction(node.parent)) || ts.isVariableDeclaration(node);
    }
}
