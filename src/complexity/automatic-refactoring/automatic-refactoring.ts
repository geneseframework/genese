import { SyntaxKind } from 'ts-morph';

import { AstFolder } from '../json-ast-to-reports/models/ast/ast-folder.model';
import { RefactorProposal } from './models/refactor-proposal.model';
import { Refactorer } from './models/refactorer.model';
// import { BigIfElseRefactorer } from './refactorers/bigIfElse.refactorer';

import { ProjectService } from './services/project.service';
import { UselessElseRefactorer } from './refactorers/uselessElse.refactorer';
import { RefactorReportService } from './services/refactor-report.service';
import { TernaryToNullishCoalescing } from './refactorers/ternaryToCoalescing.refactorer';
import { BigIfElseRefactorer } from './refactorers/bigIfElse.refactorer';

export class AutomaticRefactoring {
    static refactorProposals: RefactorProposal[] = [];
    static refactorers: (new (projectService: ProjectService, existingRefactorProposals: RefactorProposal[]) => Refactorer)[];


    static setRefactorer(...refactorers: (new (projectService: ProjectService, existingRefactorProposals: RefactorProposal[]) => Refactorer)[]): void {
        this.refactorers = refactorers;
    }


    static start(astFolder: AstFolder): void {
        this.setRefactorer(BigIfElseRefactorer, UselessElseRefactorer);

        this.refactorProposals = this.refactorFromSourceFile();
        new RefactorReportService(this.refactorProposals, astFolder).generateRefactorReport();
    }

    static refactorFromSourceFile(): RefactorProposal[] {
        const projectService: ProjectService = new ProjectService('tsconfig.json');
        let systems: RefactorProposal[] = [];
        this.refactorers.forEach((r: new (projectService: ProjectService, existingRefactorProposals: RefactorProposal[]) => Refactorer) => {
            const REFACTORER = new r(projectService, systems);
            REFACTORER.apply();
            systems.push(...REFACTORER.refactorProposals);
        });

        

        return systems;
    }
}
