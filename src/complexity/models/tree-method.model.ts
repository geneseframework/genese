import * as ts from 'typescript';
import { TreeFile } from './tree-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService, ComplexityService as CS } from '../services/complexity.service';
import { TreeNode } from './tree-node.model';
import { Options } from './options';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluable } from './evaluable.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Code } from './code.model';
import { CodeService } from '../services/code.service';
import { IncrementKind } from '../enums/increment-kind';
import { CognitiveCpx } from './cognitive-cpx.model';

/**
 * Element of the TreeNode structure corresponding to a given method
 */
export class TreeMethod extends Evaluable implements IsAstNode {

    astPosition = 0;
    codeService: CodeService = new CodeService();
    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;           // The cognitive status of the method
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;          // The cyclomatic status of the method
    #displayedCode?: Code = undefined;
    filename ?= '';                                                 // The name of the file containing the method
    name ?= '';                                                     // The name of the method
    node: ts.Node = undefined;                                      // The AST node corresponding to the method
    #originalCode?: Code = undefined;
    treeFile?: TreeFile = new TreeFile();                           // The TreeFile which contains the TreeMethod
    tree?: TreeNode = undefined;                                        // The AST of the method itself


    constructor(node: ts.Node) {
        super();
        this.node = node;
        this.name = Ast.getMethodName(node);
    }


    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate(): void {
        this.cognitiveValue = CS.getCognitiveCpx(this.tree);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticCpx = CS.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
        this.filename = this.treeFile?.sourceFile?.fileName ?? '';
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


    createDisplayedCode(tree: TreeNode = this.tree): void {
        this.#displayedCode = new Code();
        for (const line of this.#originalCode.lines) {
            this.#displayedCode.lines.push({
                cognitiveCpx: new CognitiveCpx(),
                issue: line.issue,
                text: line.text,
                position: line.position,
                breakFlow: line.breakFlow,
                nesting: line.nesting
            });
        }
        this.setCodeLines(tree);
        this.addCommentsToDisplayedCode();
        this.#displayedCode.setTextWithLines();
    }


    setCodeLines(tree: TreeNode): void {
        for (const childTree of tree.children) {
            if (childTree.increasesCognitiveComplexity) {
                const issue = this.codeService.getLineIssue(this.#originalCode, childTree.node?.pos - this.astPosition);
                this.#displayedCode.lines[issue].impactsCognitiveCpx = true;
                this.#displayedCode.lines[issue].cognitiveCpx.breakFlow += childTree.cognitiveCpx.breakFlow;
                this.#displayedCode.lines[issue].cognitiveCpx.nesting += childTree.cognitiveCpx.nesting;

            }
            if (tree?.node?.kind === ts.SyntaxKind.IfStatement) {
                if (tree?.node?.['elseStatement']?.pos === childTree?.node?.pos) {
                    const issue = this.codeService.getLineIssue(this.#originalCode, childTree.node?.pos - this.astPosition);
                    this.#displayedCode.lines[issue].impactsCognitiveCpx = true;
                    this.#displayedCode.lines[issue].cognitiveCpx.breakFlow += 1;
                }
            }
            this.setCodeLines(childTree);
        }
    }



    addCommentsToDisplayedCode(): void {
        this.#displayedCode.lines
            .filter(line => !!line.impactsCognitiveCpx)
            .forEach(line => {
                let comment = '';
                // const cognitiveCpx = this.codeService.cognitiveCpx(line);
                if (line.cognitiveCpx?.total > 0) {
                    comment = `+${line.cognitiveCpx.total} Cognitive complexity (+${line.cognitiveCpx.breakFlow} break flow`;
                    if (line.cognitiveCpx.nesting > 0) {
                        comment = `${comment}, +${line.cognitiveCpx.nesting} nesting`;
                    }
                    comment = `${comment})`;

                }
                this.#displayedCode.lines[line.issue - 1].text = this.#originalCode.addComment(comment, this.#originalCode.lines[line.issue - 1]);
            });
    }


    increment(issue: number, incrementKind: IncrementKind): void {
        this.#displayedCode.lines[issue][incrementKind] = this.#displayedCode.lines[issue]?.[incrementKind] ? this.#displayedCode.lines[issue]?.[incrementKind] + 1 : 1;
    }



}
