import { Project, SourceFile } from 'ts-morph';

import { AstFile } from '../json-ast-to-reports/models/ast/ast-file.model';
import { AstFolder } from '../json-ast-to-reports/models/ast/ast-folder.model';
import { Refactorer } from './models/refactorer.model';
import { System } from './models/system.model';
import { BigIfElseRefactorer } from './refactorers/bigIfElse.refactorer';
import { RefactorReportService } from './services/refactor-report.service';

export class ReportToRefactorReport {
    static systems: System[] = [];
    static refactorers: (new () => Refactorer)[];

    static setRefactorer(...refactorers: (new () => Refactorer)[]): void {
        this.refactorers = refactorers;
    }

    /**
     * Walk through the folder to catch all methods
     * generate the refactor report
     * @param astFolder the folder
     * @returns{void}
     */
    static start(astFolder: AstFolder): void {
        this.setRefactorer(BigIfElseRefactorer);
        this.folderWalk(astFolder);
        new RefactorReportService(this.systems, astFolder).generateRefactorReport();
    }

    /**
     * refactor methods from folder
     * @param astFolder the folder
     * @returns {void}
     */
    static folderWalk(astFolder: AstFolder): void {
        astFolder?.astFiles?.forEach((afile: AstFile) => {
            const SOURCE_FILE = new Project().createSourceFile('test.ts', afile.code.text);
            const METHODS = this.refactorFromSourceFile(SOURCE_FILE, afile);
            this.systems.push(...METHODS);
        });
        astFolder?.children?.forEach((afolder: AstFolder) => this.folderWalk(afolder));
    }

    /**
     * Analyze methods from source file object
     * @param sourceFile the source file
     * @param astFile the concerned file
     * @returns {System[]}
     */
    static refactorFromSourceFile(sourceFile: SourceFile, astFile: AstFile): System[] {
        let systems: System[] = [];
        this.refactorers.forEach((r: new () => Refactorer) => {
            const REFACTORER = new r();
            REFACTORER.prepareSystems(sourceFile, astFile).analyze();
            REFACTORER.oldSystems.forEach((s: System, i: number) => {
                s.refactoredSystem = REFACTORER.systems[i];
            });
            systems.push(...REFACTORER.oldSystems);
        });
        return systems.filter((s: System) => s.refactoredSystem?.isRefactored);
    }
}
