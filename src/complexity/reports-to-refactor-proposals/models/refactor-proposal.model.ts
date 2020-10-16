import { System } from './system.model';

export class RefactorProposal {
    title?: string = '';
    oldCode?: string = '';
    newCode?: string = '';

    /**
     * Create a refactor proposal from a method
     * @param system the method
     * @returns {RefactorProposal}
     */
    static from(system: System, title: string = system.astFile?.name): RefactorProposal {
        return {
            title,
            oldCode: system.node?.getFullText(),
            newCode: system.refactoredSystem?.node?.getFullText(),
        };
    }
}
