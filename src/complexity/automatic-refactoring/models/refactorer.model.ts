import { createWrappedNode, MethodDeclaration, Node, SyntaxKind, TransformTraversalControl } from 'ts-morph';

import { ProjectService } from '../services/project.service';
import { RefactorProposal } from './refactor-proposal.model';
import { Transformer } from './transformer.model';

export abstract class Refactorer {
    private projectService: ProjectService;

    abstract readonly REFACTORED_NODE_KIND: SyntaxKind;

    public nodes: Node[];
    public existingRefactorProposals: RefactorProposal[];
    public refactorProposals: RefactorProposal[] = [];
    public transformers: Transformer[];
    // public mapper: (node: {old: any, new: any}) => RefactorProposal = (node: {old: any, new: any}) => {
    //     node.formatText();
    //     return {
    //         newCode: node.getFullText(),
    //         oldCode: this.projectService.getInitialSystem(node)?.getFullText(),
    //         title: 'test',
    //     };
    // };

    constructor(projectService: ProjectService, existingRefactorProposals: RefactorProposal[]) {
        this.projectService = projectService;
        this.existingRefactorProposals = existingRefactorProposals;
    }


    /**
     * Refactor nodes if it needed
     * apply transformers
     * then map refactored node in refactor proposal
     * @returns {void}
     */
    apply(): void {
        this.nodes = this.projectService.getNodesOfKinds(this.REFACTORED_NODE_KIND)
            .filter(n => this.refactorNeeded(n))
            .map((n, i) => {
                n.formatText();
                this.refactorProposals.push({
                    oldCode: n.getFullText(),
                    newCode: undefined,
                    title: (n as MethodDeclaration).getStructure()['name'],
                    id: (n as MethodDeclaration).getStructure()['name']
                });
                this.refactor(n);
                const existingRefactor = this.existingRefactorProposals.find(er => er.id === this.refactorProposals[i].id);
                if (existingRefactor && existingRefactor.usedTransformer) {
                    this.refactorProposals[i].oldCode = existingRefactor.oldCode;
                    const transformer = existingRefactor.usedTransformer;
                    n = n[transformer.nodeMethod]().transform(transformer.transformer);
                }
                n.formatText();
                this.refactorProposals[i].newCode = n.getFullText();
                return n;
            })
        if (this.transformers) {
            this.nodes = this.transformers.map((t: Transformer, i) => {
                const r = t.baseNode[t.nodeMethod]().transform(t.transformer);
                r.formatText();
                this.refactorProposals[i].newCode = r.getFullText();
                this.refactorProposals[i].usedTransformer = t;
                return r;
            });
        }
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
    abstract refactorNeeded(node: Node): boolean;


    /**
     * wrap a basic node into ts-morph model
     * use project to get source file and type checker
     * @param node
     * @param traversal the node to wrap
     * @returns {Node}
     */
    static wrapCurrentNode(node: Node, traversal: TransformTraversalControl): Node {
        return createWrappedNode(traversal.visitChildren(), {
            sourceFile: node.getSourceFile().compilerNode,
            typeChecker: node.getProject().getTypeChecker().compilerObject,
        });
    }
}
