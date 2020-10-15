import { SyntaxKind } from 'ts-morph';
import { Method } from './method.model';

export class RefactorProposal {
    fileName?: string = '';
    methodName?: string = '';
    oldCode?: string = '';
    newCode?: string = '';

    /**
     * Create a refactor proposal from a method
     * @param method the method
     * @returns {RefactorProposal}
     */
    static from(method: Method): RefactorProposal {
        return {
            fileName: method.astFile?.name,
            methodName: method.node?.getFirstChildByKind(SyntaxKind.Identifier)?.getFullText(),
            oldCode: method.node?.getFullText(),
            newCode: method.refactoredMethod?.node?.getFullText(),
        };
    }
}
