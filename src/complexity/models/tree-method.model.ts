import * as ts from 'typescript';
import { TreeFile } from './tree-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { TreeNode } from './tree-node.model';
import { Options } from './options';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluable } from './evaluable.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Code } from './code.model';
import { CodeService } from '../services/code.service';
import { CpxFactors } from './cpx-factors.model';
import { CODE_LINE_THRESHOLD } from '../const/thresholds';
import { FactorCategory } from '../enums/factor-category.enum';

/**
 * Element of the TreeNode structure corresponding to a given method
 */
export class TreeMethod extends Evaluable implements IsAstNode {

    astPosition = 0;                                                // The position of the AST node of the method in the code of its file
    codeService: CodeService = new CodeService();                   // The service managing Code objects
    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;           // The cognitive status of the method
    #cpxIndex = undefined;
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;          // The cyclomatic status of the method
    #displayedCode?: Code = undefined;                              // The code to display in the report
    filename ?= '';                                                 // The name of the file containing the method
    name ?= '';                                                     // The name of the method
    node: ts.Node = undefined;                                      // The AST node corresponding to the method
    #originalCode?: Code = undefined;                               // The original Code of the method (as Code object)
    treeFile?: TreeFile = new TreeFile();                           // The TreeFile which contains the TreeMethod
    tree?: TreeNode = undefined;                                    // The AST of the method itself


    constructor(node: ts.Node) {
        super();
        this.node = node;
        this.name = Ast.getMethodName(node);
    }


    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate(): void {
        // console.log('NODE COUNT', this.nodeCount)
        this.tree.printAllChildren();
        // this.cognitiveValue = CS.getCognitiveCpx(this.tree);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticCpx = CS.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
        this.filename = this.treeFile?.sourceFile?.fileName ?? '';
    }


    /**
     *
     */
    get nodeCount(): number {
        return Ast.getNodeCount(this.node);
    }


    /**
     * Get the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType: ComplexityType): MethodStatus {
        let status = MethodStatus.WARNING;
        if (
            (cpxType === ComplexityType.COGNITIVE && this.cognitiveValue <= Options.cognitiveCpx.warningThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= Options.cyclomaticCpx.warningThreshold)) {
            status = MethodStatus.CORRECT;
        } else if (
            (cpxType === ComplexityType.COGNITIVE && this.cognitiveValue > Options.cognitiveCpx.errorThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticCpx > Options.cyclomaticCpx.errorThreshold)) {
            status = MethodStatus.ERROR;
        }
        return status;
    }


    /**
     * Gets the Code of the method (as Code object)
     */
    get originalCode(): Code {
        return this.#originalCode;
    }


    /**
     * Gets the full originalText of the method
     */
    set originalCode(code : Code) {
        this.#originalCode = code;
    }


    /**
     * Gets the full originalText of the method
     */
    get displayedCode(): Code {
        return this.#displayedCode;
    }


    get cpxIndex(): number {
        return this.#cpxIndex ?? this.calculateCpxIndex();
    }


    private calculateCpxIndex(): number {
        if (!(this.#displayedCode?.lines?.length > 0)) {
            this.createDisplayedCode();
        }
        let count = 0;
        for (const line of this.#displayedCode?.lines) {
            count += line.cpxFactors.total;
        }
        return count;
    }

    /**
     * Creates the code to display with the original code of a TreeNode
     * @param tree  // The TreeNode to analyse
     */
    createDisplayedCode(tree: TreeNode = this.tree): void {
        this.#displayedCode = new Code();
        for (const line of this.#originalCode.lines) {
            this.#displayedCode.lines.push({
                cpxFactors: new CpxFactors(),
                issue: line.issue,
                text: line.text,
                position: line.position,
            });
        }
        this.setCodeLines(tree);
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
        this.#displayedCode.setTextWithLines();
    }


    /**
     * Sets the CodeLines of the displayed Code of this method
     * @param tree
     */
    setCodeLines(tree: TreeNode): void {
        for (const childTree of tree.children) {
            const issue = this.codeService.getLineIssue(this.#originalCode, childTree.node?.pos - this.astPosition);
            this.#displayedCode.lines[issue].cpxFactors = this.#displayedCode.lines[issue].cpxFactors.add(childTree.cpxFactors);
            this.setCodeLines(childTree);
        }
    }


    /**
     * Adds information about complexity increment reasons for each line of the displayed code
     */
    addCommentsToDisplayedCode(): void {
        this.#displayedCode.lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
                let comment = `+${line.cpxFactors.total} Complexity index (+${line.cpxFactors.totalBasic} ${FactorCategory.BASIC}`;
                comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${FactorCategory.AGGREGATION}` : comment;
                // comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
                comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${FactorCategory.STRUCTURAL}` : comment;
                comment = `${comment})`;
                this.#displayedCode.lines[line.issue - 1].text = this.#originalCode.addComment(comment, this.#originalCode.lines[line.issue - 1]);
            });
    }
}
