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

/**
 * Element of the Tree structure corresponding to a given method
 */
export class TreeMethod extends Evaluable implements IsAstNode {

    #code?: Code = undefined;
    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;           // The cognitive status of the method
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;          // The cyclomatic status of the method
    #displayedText = '';
    filename ?= '';                                                 // The name of the file containing the method
    name ?= '';                                                     // The name of the method
    node: ts.Node = undefined;                                      // The AST node corresponding to the method
    #originalText = '';
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
     * Gets the full originalText of the method
     */
    get originalText(): string {
        return this.#originalText;
    }


    /**
     * Gets the full originalText of the method
     */
    set originalText(methodText: string) {
        this.#originalText = methodText;
    }


    /**
     * Gets the Code of the method (as Code object)
     */
    get code(): Code {
        if (!this.#code) {
            this.code = this.createCode();
        }
        return this.#code;
    }


    /**
     * Gets the Code of the method (as Code object)
     */
    set code(codeToSet: Code) {
        this.#code = codeToSet;
    }


    /**
     * Gets the full originalText of the method
     */
    get displayedText(): string {
        return this.#displayedText;
    }


    private createCode(): Code {
        return;

    }


    createDisplayedText(): void {
        console.log('CODE ORIGINAL', this.code)
        this.#displayedText = '';
        for (const line of this.code.lines) {
            this.#displayedText += `${line?.text?.padEnd(this.#code.maxLineWidth + 10, '-')}\n`;
        }
    }

}
