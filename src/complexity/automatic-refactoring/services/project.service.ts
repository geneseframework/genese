import { KindToNodeMappings, Node, Project, SourceFile, SyntaxKind } from 'ts-morph';

export class ProjectService {
    public initialProject: Project;
    public refactoredProject: Project;

    constructor(tsConfigFilePath: string) {
        this.initialProject = new Project({ tsConfigFilePath });
        this.refactoredProject = new Project({ tsConfigFilePath });
    }

    /**
     * Get a node name to identify it
     * @param node the concerned node
     * @returns {string}
     */
    getName(node: any): string {
        if (node.getName) return node.getName();
        if (node.getBaseName) return node.getBaseName();
        return node.getPos() || '';
    }

    /**
     * Get node from initial project from a node from the refactored project
     * @param node the refacotred node
     * @returns {Node}
     */
    getInitialSystem(node: Node): Node {
        try {
            const PATH = node.getSourceFile().getFilePath();
            const KIND: SyntaxKind = node.getKind();
            const NAME: string = this.getName(node);
            const SYSTEMS = this.initialProject.getSourceFile(PATH).getDescendantsOfKind(KIND);
            return SYSTEMS.find((m: any) => this.getName(m) === NAME);
        } catch (err) {
            console.log('Unable to identify initial Node', err);
            return node;
        }
    }

    /**
     * Get systems of a given Syntax Kind
     * @param kind the kind
     * @returns {Node[]}
     */
    getSystemsOfKinds<T extends SyntaxKind>(kind: T): Node[] {
        const SYSTEMS: KindToNodeMappings[T][] = [];
        this.refactoredProject.getSourceFiles().forEach((sf: SourceFile) => {
            const FILE_SYSTEMS = sf.getDescendantsOfKind(kind);
            SYSTEMS.push(...FILE_SYSTEMS);
        });
        return SYSTEMS;
    }
}
