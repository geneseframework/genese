import { CyclomaticCpxService as CS } from '../../services/cyclomatic-cpx.service';
import { AstNode } from './ast-node.model';
import { Code } from '../code/code.model';
import { CodeService } from '../../services/code.service';
import { Ast } from '../../services/ast/ast.service';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { CodeLine } from '../code/code-line.model';
import { cpxFactors } from '../../../core/const/cpx-factors';
import { FactorCategory } from '../../enums/factor-category.enum';
import { LogService } from '../../services/log.service';
import { Options } from '../../../core/models/options.model';
import * as chalk from 'chalk';

/**
 * Element of the AstNode structure corresponding to a given method
 */
export class AstMethod implements Evaluate {

    #astNode?: AstNode = undefined;                                     // The AST of the method itself
    #codeService: CodeService = new CodeService();                      // The service managing Code objects
    #cognitiveStatus: MethodStatus = MethodStatus.CORRECT;              // The cognitive status of the method
    #cpxFactors?: CpxFactors = undefined;                               // The complexity factors of the AstMethod
    #cyclomaticCpx ?= 0;                                                // The cyclomatic complexity of the AstMethod
    #cpxIndex = undefined;                                              // The complexity index of the method
    #cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;             // The cyclomatic status of the method
    #displayedCode?: Code = undefined;                                  // The code to display in the report
    #name: string = undefined;                                          // The name of the method
    #originalCode?: Code = undefined;                                   // The original Code of the method (as Code object)



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astNode(): AstNode {
        return this.#astNode;
    }


    set astNode(astNode: AstNode) {
        this.#astNode = astNode;
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


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = this.#astNode.name;
        return this.#name;
    }


    get originalCode(): Code {
        return this.#originalCode;
    }


    set originalCode(code : Code) {
        this.#originalCode = code;
    }


    get position() {
        return this.astNode?.pos;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Creates the displayed code of this AstMethod and evaluates its complexity
     */
    evaluate(): void {
        this.createDisplayedCode();
        LogService.logMethod(this, true);
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
            (cpxType === ComplexityType.COGNITIVE && this.cpxIndex > Options.cognitiveCpx.errorThreshold)
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
        for (const line of this.originalCode.lines) {
            const displayedLine = new CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.text = line.text;
            displayedLine.end = line.end;
            displayedLine.pos = line.pos;
            this.#displayedCode.lines.push(displayedLine);
        }
    }


    /**
     * Calculates the complexity factors of each CodeLine
     * @param astNode                   // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    private setCpxFactorsToDisplayedCode(astNode: AstNode, startedUncommentedLines = false): void {
        for (const childAst of astNode.children) {
            // console.log(chalk.blueBright('CHILD ASTTTT'), childAst.kind, childAst.pos, this.position, chalk.redBright('DIFF', childAst.pos - this.position))
            let issue = this.#codeService.getLineIssue(this.#originalCode, childAst.pos - this.position);
            const codeLine: CodeLine = this.#displayedCode.lines[issue];
            if (Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.basic.node = cpxFactors.basic.node;
                issue--;
            }
            if (!startedUncommentedLines && astNode.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                this.increaseLineCpxFactors(astNode, codeLine);
                // console.log(chalk.greenBright('CHILD ASTTTT UNOMMENTED'), childAst.kind, childAst.pos, this.position, issue)
                startedUncommentedLines = true;
            } else if (startedUncommentedLines) {
                this.increaseLineCpxFactors(childAst, codeLine);
            }
            this.#displayedCode.lines[issue].astNodes.push(childAst);
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
                let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalBasic.toFixed(1)} ${FactorCategory.BASIC}`;
                comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${FactorCategory.AGGREGATION}` : comment;
                comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
                comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
                comment = line.cpxFactors.totalRecursion > 0 ? `${comment}, +${line.cpxFactors.totalRecursion} recursivity` : comment;
                comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${FactorCategory.STRUCTURAL}` : comment;
                comment = `${comment})`;
                this.#displayedCode.lines[line.issue - 1].text = this.#originalCode.addComment(comment, this.#originalCode.lines[line.issue - 1]);
            });
    }
}
