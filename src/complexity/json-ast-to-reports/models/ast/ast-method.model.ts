import { CyclomaticCpxService as CS } from '../../services/cyclomatic-cpx.service';
import { AstNode } from './ast-node.model';
import { Code } from '../code/code.model';
import { Ast } from '../../services/ast/ast.service';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { CodeLine } from '../code/code-line.model';
import { cpxFactors } from '../../../core/const/cpx-factors';
import { FactorCategory } from '../../enums/factor-category.enum';
import { Options } from '../../../core/models/options.model';

/**
 * Element of the AstNode structure corresponding to a given method
 */
export class AstMethod implements Evaluate {

    #astNode?: AstNode = undefined;                                     // The AST of the method itself
    #codeLines?: CodeLine[] = [];                                       // The array of CodeLine of the AstMethod (elements of the array of CodeLine of the corresponding AstFile)
    #cognitiveStatus: MethodStatus = MethodStatus.CORRECT;              // The cognitive status of the method
    #cpxFactors?: CpxFactors = undefined;                               // The complexity factors of the AstMethod
    #cyclomaticCpx ?= 0;                                                // The cyclomatic complexity of the AstMethod
    #cpxIndex = undefined;                                              // The complexity index of the method
    #cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;             // The cyclomatic status of the method
    #displayedCode?: Code = undefined;                                  // The code to display in the report
    #maxLineLength ?= 0;                                                // The max length of the lines of the code
    #name: string = undefined;                                          // The name of the method



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astNode(): AstNode {
        return this.#astNode;
    }


    set astNode(astNode: AstNode) {
        this.#astNode = astNode;
    }


    get codeLines(): CodeLine[] {
        return this.#codeLines;
    }


    set codeLines(codeLines: CodeLine[]) {
        this.#codeLines = codeLines;
    }


    get cognitiveStatus(): MethodStatus {
        return this.#cognitiveStatus;
    }


    set cognitiveStatus(cognitiveStatus: MethodStatus) {
        this.#cognitiveStatus = cognitiveStatus;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cpxIndex(): number {
        return this.#cpxIndex ?? this.cpxFactors.total;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    get cyclomaticStatus(): MethodStatus {
        return this.#cyclomaticStatus;
    }


    set cyclomaticStatus(cyclomaticStatus: MethodStatus) {
        this.#cyclomaticStatus = cyclomaticStatus;
    }


    get displayedCode(): Code {
        return this.#displayedCode;
    }


    get end(): number {
        return this.astNode.end;
    }


    get maxLineLength(): number {
        if (this.#maxLineLength) {
            return this.#maxLineLength;
        }
        this.#maxLineLength = Math.max(...this.codeLines?.map(l => l.end - l.start));
        return this.#maxLineLength;
    }


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = this.#astNode.name;
        return this.#name;
    }


    get pos() {
        return this.astNode?.pos;
    }


    get start() {
        return this.astNode?.start;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Creates the displayed code of this AstMethod and evaluates its complexity
     */
    evaluate(): void {
        this.createDisplayedCode();
        // LogService.logMethod(this);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticCpx = CS.calculateCyclomaticCpx(this.astNode);
        this.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
    }


    /**
     * Calculates the Complexity Factors of the method
     */
    private calculateCpxFactors(): void {
        if (!(this.#displayedCode?.lines?.length > 0)) {
            this.createDisplayedCode();
        }
        this.cpxFactors = new CpxFactors();
        for (const line of this.#displayedCode?.lines) {
            this.cpxFactors = this.cpxFactors.add(line.cpxFactors);
        }
    }


    /**
     * Gets the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType: ComplexityType): MethodStatus {
        let status = MethodStatus.WARNING;
        if (
            (cpxType === ComplexityType.COGNITIVE && this.cpxIndex <= Options.cognitiveCpx.warningThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= Options.cyclomaticCpx.warningThreshold)) {
            status = MethodStatus.CORRECT;
        } else if (
            (cpxType === ComplexityType.COGNITIVE && Math.round(this.cpxIndex) > Options.cognitiveCpx.errorThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticCpx > Options.cyclomaticCpx.errorThreshold)) {
            status = MethodStatus.ERROR;
        }
        return status;
    }


    /**
     * Creates the method's code to display, with comments
     * @param astNode  // The AstNode to analyse (by default: the AstNode associated to this AstMethod)
     */
    createDisplayedCode(astNode: AstNode = this.astNode): void {
        this.setDisplayedCodeLines();
        this.setDeclarationCpxFactors();
        this.setCpxFactorsToDisplayedCode(astNode, false);
        this.#displayedCode.setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxFactors();
        this.#displayedCode.setTextWithLines();
    }


    /**
     * Creates the Code object corresponding to the code to display
     */
    private setDisplayedCodeLines(): void {
        this.#displayedCode = new Code();
        for (const line of this.codeLines) {
            const displayedLine = new CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.end = line.end;
            displayedLine.start = line.start;
            displayedLine.text = line.text;
            displayedLine.text = this.getDisplayedLineText(displayedLine);
            this.#displayedCode.lines.push(displayedLine);
        }
    }


    /**
     * Returns the text to display for a given line. Removes characters of the first and the last lines which are not inside the AstMethod
     * @param line      // The line to display
     */
    private getDisplayedLineText(line: CodeLine): string {
        let text = line.text;
        if (line.issue === this.codeLines[0]?.issue) {
            const firstCharPosition = this.start - line.start;
            const indentation = text.slice(0, text.length - text.trimLeft().length)
            text = `\n${indentation}${text.slice(firstCharPosition)}`;
        }
        if (line.issue === this.codeLines[this.codeLines.length - 1]?.issue) {
            const lastCharPosition = this.end - line.start;
            text = text.slice(0, lastCharPosition);
        }
        return text;
    }


    private setDeclarationCpxFactors(): void {
        this.increaseLineCpxFactors(this.astNode, this.#displayedCode.getLine(this.astNode.lineStart));
        this.#displayedCode.getLine(this.astNode.lineStart).astNodes.push(this.astNode);
    }


    /**
     * Calculates the complexity factors of each CodeLine
     * @param astNode                   // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    private setCpxFactorsToDisplayedCode(astNode: AstNode, startedUncommentedLines = false): void {
        for (const childAst of astNode.children) {
            let issue = Math.max(childAst.lineStart, this.codeLines[0]?.issue);
            const codeLine: CodeLine = this.#displayedCode.lines.find(l => l.issue === issue);
            if (Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.atomic.node = cpxFactors.atomic.node;
                issue--;
            }
            this.increaseLineCpxFactors(childAst, codeLine);
            this.#displayedCode.getLine(issue).astNodes.push(childAst);
            this.setCpxFactorsToDisplayedCode(childAst, startedUncommentedLines);
        }
    }


    /**
     * Adds the Complexity of a AstNode to its CodeLine
     * @param astNode      // The AstNode inside the line of code
     * @param codeLine      // The CodeLine containing the AstNode
     */
    private increaseLineCpxFactors(astNode: AstNode, codeLine: CodeLine): void {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(astNode?.cpxFactors);
        }

    }


    /**
     * Adds information about complexity factors for each line of the displayed code
     */
    private addCommentsToDisplayedCode(): void {
        this.#displayedCode.lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
                let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalAtomic.toFixed(1)} ${FactorCategory.ATOMIC}`;
                comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${FactorCategory.AGGREGATION}` : comment;
                comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
                comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
                comment = line.cpxFactors.totalRecursion > 0 ? `${comment}, +${line.cpxFactors.totalRecursion} recursivity` : comment;
                comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${FactorCategory.STRUCTURAL}` : comment;
                comment = line.cpxFactors.totalUse > 0 ? `${comment}, +${line.cpxFactors.totalUse} ${FactorCategory.USE}` : comment;
                comment = `${comment})`;
                this.#displayedCode.getLine(line.issue).addComment(comment, this.maxLineLength);
            });
    }
}
