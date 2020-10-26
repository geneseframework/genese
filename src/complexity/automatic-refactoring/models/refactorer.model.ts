import { createWrappedNode, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { ProjectService } from '../services/project.service';
import { RefactorProposal } from './refactor-proposal.model';
import { Transformer } from './transformer.model';

export abstract class Refactorer {
    public readonly projectService: ProjectService = new ProjectService('tsconfig.json');

    public nodes: Node[];
    public refactoredProposals: RefactorProposal[] = [];
    public transformers: Transformer[];
    public mapper: (node: Node) => RefactorProposal = (node: Node) => {
        node.formatText();        
        return {
            newCode: node.getFullText(),
            oldCode: this.projectService.getInitialSystem(node)?.getFullText(),
            title: 'test',
        };
    };

    constructor(kind: SyntaxKind) {
        this.nodes = this.projectService.getSystemsOfKinds(kind);
    }

    /**
     * Refactor nodes if it needed
     * apply transformers
     * then map refactored node in refactor proposal
     * @returns {void}
     */
    analyze(): void {
        this.nodes = this.nodes.map((n: Node) => this.needRefacto(n) && this.refactor(n));
        if (this.transformers) {
            this.nodes = this.transformers.map((t: Transformer) => {
                return t.node.transform(t.transformer)
            });
        }
        this.refactoredProposals = this.nodes.filter((n) => n).map(this.mapper);
    }

    /**
     * Add a transformer
     * @param transformer
     * @returns {void}
     */
    addTransformer(transformer: Transformer): void {
        if (!this.transformers) this.transformers = [];
        if (!this.transformers.includes(transformer)) {
            this.transformers.push(transformer);
        }
    }

    /**
     * Refactor a node by using the transform method
     * @param node the node to refactor
     * @returns {Node}
     */
    abstract refactor(node: Node): Node;

    /**
     * Check if a Node need a refacto
     * @param node the node to check
     * @returns {boolean}
     */
    abstract needRefacto(node: Node): boolean;

    /**
     * wrap a basic node into ts-morph model
     * use project to get source file and type checker
     * @param system the uppest system
     * @param traversal the node to wrap
     * @returns {Node}
     */
    static wrapCurrentNode(system: Node, traversal: TransformTraversalControl): Node {
        return createWrappedNode(traversal.visitChildren(), {
            sourceFile: system.getSourceFile().compilerNode,
            typeChecker: system.getProject().getTypeChecker().compilerObject,
        });
    }
}
