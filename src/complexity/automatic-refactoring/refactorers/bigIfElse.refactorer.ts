import { Block, Identifier, IfStatement, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Input } from '../models/input.model';
import { Refactorer } from '../models/refactorer.model';
import { RefactorerUtils } from '../utils/refactorer.utils';

export class BigIfElseRefactorer extends Refactorer {
    static readonly KIND = SyntaxKind.MethodDeclaration;

    needRefacto(system: Node): boolean {
        const IF_STATEMENTS = system.getDescendantsOfKind(SyntaxKind.IfStatement);
        return IF_STATEMENTS.some((i: IfStatement) => {
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
    refactor(system: Node): Node {
        let methods = [];
        let parameters: Input[] = [];
        let inputs: Input[] = [];
        const NODE = system.transform((traversal: TransformTraversalControl) => {
            let node: Node = Refactorer.wrapCurrentNode(system, traversal);
            this.catchInputs(node, inputs);
            if (this.isConditionnedBlock(node.compilerNode)) {
                node.getDescendantsOfKind(SyntaxKind.VariableStatement).forEach((s) => {
                    const IDENTIFIER: string = s.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
                    inputs = inputs.filter((i) => i.identifier !== IDENTIFIER);
                });

                this.keepOnlyParameters(node, inputs, parameters);

                const METHOD_NAME = `methodToRename${methods.length}`;
                const PARAMETERS = parameters.map(({ identifier, type }) => RefactorerUtils.createSimpleParameter(identifier, type));
                const NEW_METHOD = RefactorerUtils.createSimpleMethod(METHOD_NAME, node.compilerNode, PARAMETERS);
                methods.push(NEW_METHOD);

                const CONTAIN_RETURN = node.compilerNode.statements.find((s) => s.kind === ts.SyntaxKind.ReturnStatement);
                const METHOD_CALL: any = RefactorerUtils.createMethodCall(METHOD_NAME, []);

                return ts.createBlock(CONTAIN_RETURN ? [ts.createReturn(METHOD_CALL)] : [METHOD_CALL]);
            }
            return node.compilerNode;
        });

        this.addMethodToClass(NODE, methods);
        return NODE;
    }

    private addMethodToClass(node: Node, methods): void {
        this.addTransformer({
            node: node.getParent(),
            transformer: (traversal: TransformTraversalControl) => {
                const NODE = traversal.visitChildren();
                if (ts.isClassDeclaration(NODE)) {
                    const METHODS = ts.createNodeArray([...NODE.members, ...methods]);
                    return ts.createClassDeclaration([], [], NODE.name, [], [], METHODS);
                }
                return NODE;
            },
        });
    }

    private keepOnlyParameters(node: Node, inputs: Input[], parameters: Input[]): void {
        node.getDescendantsOfKind(SyntaxKind.Identifier).forEach((d: Identifier) => {
            inputs.forEach((i: Input) => {
                if (i.identifier === d.getFullText() && !parameters.includes(i)) parameters.push(i);
            });
        });
    }

    private catchInputs(node: Node, inputs: Input[]): void {
        if (this.isInputs(node.compilerNode)) {
            const IDENTIFIER: string = node.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
            const TYPE: ts.TypeNode = node?.compilerNode.type;
            if (!inputs.find((i) => i.identifier === IDENTIFIER)) inputs.push({ identifier: IDENTIFIER, type: TYPE, isParameter: false });
        }
    }

    private isConditionnedBlock(node: ts.Node): node is ts.Block {
        return node.parent && ts.isIfStatement(node.parent) && ts.isBlock(node) && node.statements.length > 5;
    }

    private isInputs(node: ts.Node): node is ts.ParameterDeclaration | ts.VariableDeclaration {
        return (ts.isParameter(node) && !ts.isArrowFunction(node.parent)) || ts.isVariableDeclaration(node);
    }
}
