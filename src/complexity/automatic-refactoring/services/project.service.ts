import { KindToNodeMappings, Node, Project, SourceFile, SyntaxKind } from 'ts-morph';

export class ProjectService {
    public initialProject: Project;
    public refactoredProject: Project;

    constructor(tsConfigFilePath: string) {
        this.initialProject = new Project({ tsConfigFilePath });
        this.refactoredProject = new Project({ tsConfigFilePath });
    }

    /**
     * Get systems of a given Syntax Kind
     * @param kind the kind
     * @returns {Node[]}
     */
    getNodesOfKinds<T extends SyntaxKind>(kind: T): Node[] {
        const SYSTEMS: KindToNodeMappings[T][] = [];
        this.refactoredProject.getSourceFiles().forEach((sf: SourceFile) => {
            const FILE_SYSTEMS = sf.getDescendantsOfKind(kind);
            SYSTEMS.push(...FILE_SYSTEMS);
        });
        return SYSTEMS;
    }
}
