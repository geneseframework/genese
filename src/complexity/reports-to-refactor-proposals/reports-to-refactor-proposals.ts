import { Node, Project, SourceFile, SyntaxKind } from 'ts-morph';

import { AstFile } from '../json-ast-to-reports/models/ast/ast-file.model';
import { AstFolder } from '../json-ast-to-reports/models/ast/ast-folder.model';
import { Method } from './models/method.model';
import { MethodRefactorerService } from './services/method-refactorer.service';
import { RefactorReportService } from './services/refactor-report.service';

export class ReportToRefactorReport {
    static methods: Method[] = [];

    /**
     * Walk thru the folder to catch all methods
     * generate the refactor report
     * @param astFolder the folder
     * @returns{void}
     */
    static start(astFolder: AstFolder): void {
        this.folderWalk(astFolder);
        new RefactorReportService(this.methods, astFolder).generateRefactorReport();
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
            this.methods.push(...METHODS);
        });
        astFolder?.children?.forEach((afolder: AstFolder) => this.folderWalk(afolder));
    }

    /**
     * Analyze methods from source file object
     * @param sourceFile the source file
     * @param astFile the concerned file
     * @returns {Method[]}
     */
    static refactorFromSourceFile(sourceFile: SourceFile, astFile: AstFile): Method[] {
        const METHODS =
            sourceFile
                ?.getFirstChildByKind(SyntaxKind.ClassDeclaration)
                ?.getChildrenOfKind(SyntaxKind.MethodDeclaration)
                ?.map((n: Node) => new Method(n, astFile)) || [];
        METHODS.forEach((m: Method) => MethodRefactorerService.analyze(m));
        return METHODS.filter((m) => {
            return m.refactoredMethod;
        });
    }
}
