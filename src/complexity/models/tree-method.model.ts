import * as ts from 'typescript';
import { TreeFile } from './tree-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Tree } from './tree.model';
import { Options } from './options';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluable } from './evaluable.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Code } from './code.model';
import { CodeService } from '../services/code.service';
import { clone } from '../services/tools.service';

/**
 * Element of the Tree structure corresponding to a given method
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
    tree?: Tree = undefined;                                        // The AST of the method itself


    constructor(node: ts.Node) {
        super();
        this.node = node;
        this.name = Ast.getMethodName(node);
    }


    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate(): void {
        this.cognitiveValue = CS.getCognitiveComplexity(this.tree);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
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
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticValue <= Options.cyclomaticCpx.warningThreshold)) {
            status = MethodStatus.CORRECT;
        } else if (
            (cpxType === ComplexityType.COGNITIVE && this.cognitiveValue > Options.cognitiveCpx.errorThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticValue > Options.cyclomaticCpx.errorThreshold)) {
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


    createDisplayedCode(tree: Tree = this.tree): void {
        this.#displayedCode = new Code();
        for (const line of this.#originalCode.lines) {
            this.#displayedCode.lines.push({
                text: line.text,
                position: line.position
            });
        }
        this.createDisplayedCodeTreeChildren(tree)
    }

    createDisplayedCodeTreeChildren(tree: Tree) {
        for (const childTree of tree.children) {
            if (childTree.increasesCognitiveComplexity) {
                const issue = this.codeService.getLineIssue(this.#originalCode, childTree.node?.pos - this.astPosition);
                this.#displayedCode.lines[issue] = this.#originalCode.addComment('+1 Cognitive complexity', this.#originalCode.lines[issue]);
            }
            this.createDisplayedCodeTreeChildren(childTree);
        }
        this.#displayedCode.setTextWithLines();
    }

}
