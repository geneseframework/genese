import * as ts from 'typescript';
import { Ast } from '../../services/ast.service';
import { CyclomaticComplexityService as CS } from '../../services/cyclomatic-complexity.service';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { HasTreeNode } from '../../interfaces/has-tree-node';
import { CodeService } from '../../services/code.service';
import { FactorCategory } from '../../enums/factor-category.enum';
import { cpxFactors } from '../../cpx-factors';
import { LogService } from '../../services/tree/log.service';
import { Code } from '../../models/code/code.model';
import { TreeNode } from '../../models/tree/tree-node.model';
import { Options } from '../../models/options';
import { CodeLine } from '../../models/code/code-line.model';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../../models/cpx-factor/cpx-factors.model';

/**
 * Element of the TreeNode structure corresponding to a given method
 */
export class AstMethod implements Evaluate, HasTreeNode {

    codeService: CodeService = new CodeService();                   // The service managing Code objects
    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;           // The cognitive status of the method
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #cpxIndex = undefined;                                          // The complexity index of the method
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;          // The cyclomatic status of the method
    #displayedCode?: Code = undefined;                              // The code to display in the report
    #name: string = undefined;                                      // The name of the method
    #originalCode?: Code = undefined;                               // The original Code of the method (as Code object)
    #treeNode?: TreeNode = undefined;                               // The AST of the method itself



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cpxIndex(): number {
        return this.#cpxIndex ?? this.calculateCpxIndex();
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    get displayedCode(): Code {
        return this.#displayedCode;
    }


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = Ast.getMethodName(this.#treeNode?.node);
        return this.#name;
    }


    get originalCode(): Code {
        return this.#originalCode;
    }


    set originalCode(code : Code) {
        this.#originalCode = code;
    }


    get position() {
        return this.treeNode?.position;
    }


    get sourceFile(): ts.SourceFile {
        return this.#treeNode?.sourceFile;
    }


    get treeNode(): TreeNode {
        return this.#treeNode;
    }


    set treeNode(treeNode: TreeNode) {
        this.#treeNode = treeNode;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate(): void {
        this.createDisplayedCode();
        LogService.printAllChildren(this.treeNode);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticCpx = CS.calculateCyclomaticComplexity(this.#treeNode?.node);
        this.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
    }


    /**
     * Calculates the Complexity Index of the method
     */
    private calculateCpxIndex(): number {
        if (!(this.#displayedCode?.lines?.length > 0)) {
            this.createDisplayedCode();
        }
        let count = 0;
        for (const line of this.#displayedCode?.lines) {
            count += line.cpxFactors.total;
        }
        return +count.toFixed(2);
    }


    /**
     * Get the complexity status of the method for a given complexity type
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
     * @param treeNode  // The TreeNode to analyse (by default: the TreeNode associated to this TreeMethod)
     */
    createDisplayedCode(treeNode: TreeNode = this.treeNode): void {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(treeNode, false);
        this.#displayedCode.setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
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
            displayedLine.position = line.position;
            this.#displayedCode.lines.push(displayedLine);
        }
    }


    /**
     * Calculates the complexity factors of each CodeLine
     * @param treeNode                  // The TreeNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    private setCpxFactorsToDisplayedCode(treeNode: TreeNode, startedUncommentedLines = false): void {
        for (const childTree of treeNode.children) {
            let issue = this.codeService.getLineIssue(this.#originalCode, childTree.position - this.position);
            const codeLine: CodeLine = this.#displayedCode.lines[issue];
            if (Ast.isElseStatement(childTree.node)) {
                childTree.cpxFactors.basic.node = cpxFactors.basic.node;
                issue--;
            }
            if (!startedUncommentedLines && treeNode.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                this.increaseLineCpxFactors(treeNode, codeLine);
                startedUncommentedLines = true;
            } else if (startedUncommentedLines) {
                this.increaseLineCpxFactors(childTree, codeLine);
            }
            this.#displayedCode.lines[issue].treeNodes.push(childTree);
            this.setCpxFactorsToDisplayedCode(childTree, startedUncommentedLines);
        }
    }


    /**
     * Adds the Complexity of a TreeNode to its CodeLine
     * @param treeNode      // The TreeNode inside the line of code
     * @param codeLine      // The CodeLine containing the TreeNode
     */
    private increaseLineCpxFactors(treeNode: TreeNode, codeLine: CodeLine): void {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(treeNode?.cpxFactors);
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
