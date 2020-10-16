import {
    ClassDeclaration,
    createWrappedNode,
    Identifier,
    Node,
    Project,
    SourceFile,
    SyntaxKind,
    TransformTraversalControl,
    ts,
    TypeNode,
} from 'ts-morph';

import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';
import { Input } from '../models/input.model';
import { Refactorer } from '../models/refactorer.model';
import { System } from '../models/system.model';

export class BigIfElseRefactorer extends Refactorer {
    project: Project;
    sourceFile: SourceFile;

    prepareSystems(sourceFile: SourceFile, astFile: AstFile): Refactorer {
        this.project = new Project();
        this.sourceFile = this.project.createSourceFile('test.ts', sourceFile.getFullText());
        this.systems =
            this.sourceFile?.getChildrenOfKind(SyntaxKind.ClassDeclaration)?.map((n: ClassDeclaration) => new System(n, astFile)) || [];
        this.oldSystems =
            sourceFile?.getChildrenOfKind(SyntaxKind.ClassDeclaration)?.map((n: ClassDeclaration) => new System(n, astFile)) || [];
        return this;
    }

    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @param method the current method
     * @returns {void}
     */
    analyze(): void {
        this.systems.forEach((s: System) => this.refactor(s));
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    private refactor(method: System): void {
        let parameters: Input[] = [];
        let inputs: Input[] = [];
        let needRefacto = false;
        let methodsDeclaration: ts.MethodDeclaration[] = [];
        const NODE = method.node.transform((traversal: TransformTraversalControl) => {
            const node = createWrappedNode(traversal.visitChildren(), {
                sourceFile: this.sourceFile.compilerNode,
                typeChecker: this.project.getTypeChecker().compilerObject,
            });

            if (ts.isParameter(node.compilerNode) || ts.isVariableDeclaration(node.compilerNode)) {
                const IDENTIFIER: Node = node.getFirstDescendantByKind(SyntaxKind.Identifier);
                const TYPE: ts.TypeNode = node?.compilerNode.type;
                inputs.push({ identifier: IDENTIFIER?.getFullText(), type: TYPE, isParameter: false });
            }

            if (ts.isClassDeclaration(node.compilerNode)) {
                return ts.createClassDeclaration(
                    [],
                    [],
                    node.compilerNode.name,
                    [],
                    [],
                    ts.createNodeArray([...node.compilerNode.members, ...methodsDeclaration])
                );
            }

            if (
                node.compilerNode.parent &&
                ts.isIfStatement(node.compilerNode.parent) &&
                ts.isBlock(node.compilerNode) &&
                node.compilerNode.statements.length > 5
            ) {
                node.getDescendantsOfKind(SyntaxKind.Identifier).forEach((d: Identifier) => {
                    inputs.forEach((i: Input) => {
                        if (i.identifier === d.getFullText() && !parameters.includes(i)) parameters.push(i);
                    });
                });
                needRefacto = true;
                const PARAMETERS = parameters.map((p: Input) => ts.createParameter([], [], undefined, p.identifier, undefined, p.type));
                const NEW_METHOD = ts.createMethod(
                    [],
                    [],
                    undefined,
                    `test${methodsDeclaration.length}`,
                    undefined,
                    undefined,
                    PARAMETERS,
                    undefined,
                    ts.createBlock(node.compilerNode.statements)
                );
                methodsDeclaration.push(NEW_METHOD);
                return ts.createBlock([ts.createExpressionStatement(ts.createIdentifier(`this.test${methodsDeclaration.length - 1}()`))]);
            }
            return node.compilerNode;
        });

        NODE.formatText();
        method.isRefactored = needRefacto;
    }
}
