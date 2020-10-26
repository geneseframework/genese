import { SyntaxKind } from 'ts-morph';

import { AstFolder } from '../json-ast-to-reports/models/ast/ast-folder.model';
import { RefactorProposal } from './models/refactor-proposal.model';
import { Refactorer } from './models/refactorer.model';
import { BigIfElseRefactorer } from './refactorers/bigIfElse.refactorer';
import { TernaryToNullishCoalescing } from './refactorers/ternaryToCoalescing.refactorer';
import { uselessElseRefactorer } from './refactorers/uselessElse.refactorer';
import { RefactorReportService } from './services/refactor-report.service';

export class AutomaticRefactoring {
    static systems: RefactorProposal[] = [];
    static refactorers: (new (kind: SyntaxKind) => Refactorer)[];

    /**
     * Set refactorers
     * @param refactorers
     * @returns {void}
     */
    static setRefactorer(...refactorers: (new (kind: SyntaxKind) => Refactorer)[]): void {
        this.refactorers = refactorers;
    }

    /**
     * Walk through the folder to catch all methods
     * generate the refactor report
     * @param astFolder the folder
     * @returns {void}
     */
    static start(astFolder: AstFolder): void {
        this.setRefactorer(BigIfElseRefactorer);
        this.systems = this.refactorFromSourceFile();
        new RefactorReportService(this.systems, astFolder).generateRefactorReport();
    }

    /**
     * Analyze methods from source file object
     * @param sourceFile the source file
     * @param astFile the concerned file
     * @returns {RefactorProposal[]}
     */
    static refactorFromSourceFile(): RefactorProposal[] {
        let systems: RefactorProposal[] = [];
        this.refactorers.forEach((r: new (kind: SyntaxKind) => Refactorer) => {
            const REFACTORER = new r((r as any).KIND);
            REFACTORER.analyze();
            systems.push(...REFACTORER.refactoredProposals);
        });
        return systems;
    }
}
