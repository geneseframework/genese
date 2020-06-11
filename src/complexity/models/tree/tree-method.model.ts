import * as ts from 'typescript';
import { TreeFile } from './tree-file.model';
import { Ast } from '../../services/ast.service';
import { CyclomaticComplexityService as CS } from '../../services/cyclomatic-complexity.service';
import { TreeNode } from './tree-node.model';
import { Options } from '../options';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { Evaluable } from '../evaluable.model';
import { HasTreeNode } from '../../interfaces/has-tree-node';
import { Code } from '../code/code.model';
import { CodeService } from '../../services/code.service';
import { FactorCategory } from '../../enums/factor-category.enum';
import { CodeLine } from '../code/code-line.model';
import { cpxFactors } from '../../cpx-factors';
import { LogService } from '../../services/tree/log.service';

/**
 * Element of the TreeNode structure corresponding to a given method
 */
export class TreeMethod extends Evaluable implements HasTreeNode {

    codeService: CodeService = new CodeService();                   // The service managing Code objects
    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;           // The cognitive status of the method
    #cpxIndex = undefined;                                          // The complexity index of the method
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;          // The cyclomatic status of the method
    #displayedCode?: Code = undefined;                              // The code to display in the report
    #name: string = undefined;                                      // The name of the method
    #originalCode?: Code = undefined;                               // The original Code of the method (as Code object)
    // #treeFile?: TreeFile = undefined;                               // The TreeFile which contains the TreeMethod
    #treeNode?: TreeNode = undefined;                               // The AST of the method itself


    constructor() {
        super();
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get displayedCode(): Code {
        return this.#displayedCode;
    }


    get cpxIndex(): number {
        return this.#cpxIndex ?? this.calculateCpxIndex();
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


    // get treeFile(): TreeFile {
    //     return this.#treeFile;
    // }
    //
    //
    // set treeFile(treeFile: TreeFile) {
    //     this.#treeFile = treeFile;
    // }


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
     * Creates the code to display with the original code of a TreeNode
     * @param tree  // The TreeNode to analyse
     */
    createDisplayedCode(tree: TreeNode = this.treeNode): void {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(tree, false);
        this.#displayedCode.setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
        this.#displayedCode.setTextWithLines();
    }


    /**
     * Sets the code to display in the TreeFile's report
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
     * Sets the CodeLines of the displayed Code of this method
     * @param tree
     */
    private setCpxFactorsToDisplayedCode(tree: TreeNode, startedUncommentedLines = false): void {
        // let topNode = isTopNode;
        for (const childTree of tree.children) {
            let issue = this.codeService.getLineIssue(this.#originalCode, childTree.position - this.position);
            const codeLine: CodeLine = this.#displayedCode.lines[issue];
            if (Ast.isElseStatement(childTree.node)) {
                childTree.cpxFactors.basic.node = cpxFactors.basic.node;
                issue--;
            }
            console.log('zzz', tree.kind, childTree.kind)
            if (!startedUncommentedLines && tree.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                console.log('FIRSTTTT', codeLine.text)
                this.increaseLineCpxFactors(tree, codeLine);
                startedUncommentedLines = true;
            } else if (startedUncommentedLines) {

                console.log('AFTER FIRST COMMENTED LINE', codeLine.text)
                this.increaseLineCpxFactors(childTree, codeLine, false);

            }
            // startedUncommentedLines = startedUncommentedLines || !codeLine.isCommented;
            this.#displayedCode.lines[issue].treeNodes.push(childTree);
            this.setCpxFactorsToDisplayedCode(childTree, startedUncommentedLines);
        }
    }


    private increaseLineCpxFactors(tree: TreeNode, codeLine: CodeLine, isTopNode?: boolean): void {
        console.log('RECURSION ?', tree.kind, tree.isRecursiveMethod, codeLine.cpxFactors.structural.recursion)
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(tree?.cpxFactors);
            // console.log('RECURSION EQUALS ', tree.kind, codeLine.cpxFactors.structural.recursion)

        }

    }


    /**
     * Adds information about complexity increment reasons for each line of the displayed code
     */
    private addCommentsToDisplayedCode(): void {
        this.#displayedCode.lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
                let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalBasic.toFixed(1)} ${FactorCategory.BASIC}`;
                comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${FactorCategory.AGGREGATION}` : comment;
                comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
                comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
                comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${FactorCategory.STRUCTURAL}` : comment;
                comment = `${comment})`;
                this.#displayedCode.lines[line.issue - 1].text = this.#originalCode.addComment(comment, this.#originalCode.lines[line.issue - 1]);
            });
    }
}
