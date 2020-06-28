/**
 * A line of a Code object
 */
import { AstNode } from '../ast/ast-node.model';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { NestingCpx } from '../../../core/models/cpx-factor/nesting-cpx.model';
import { DepthCpx } from '../../../core/models/cpx-factor/depth-cpx.model';
import { addObjects } from '../../../core/services/tools.service';
import { Code } from './code.model';
import { CodeService } from '../../services/code.service';

export class CodeLine {

    astNodes?: AstNode[] = [];                              // The array of AstNodes corresponding to AST nodes in this line of code
    #code?: Code = undefined;
    cpxFactors?: CpxFactors = new CpxFactors();             // The complexity factors relative to this line (breakFlows, increments,...)
    end ?= 0;                                               // The position (in number of characters) of the end of the line
    #isEndingWithBlockComments?: boolean;
    issue ?= 0;                                             // The number of the line in its Code parentFunction (method)
    pos ?= 0;                                               // The position (in number of characters) of the start of the line
    text ?= '';                                             // The text of the line


    get code(): Code {
        return this.#code;
    }


    set code(code: Code) {
        this.#code = code;
    }

    get isEndingWithBlockComments(): boolean {
        if (this.#isEndingWithBlockComments !== undefined) {
            return this.#isEndingWithBlockComments;
        }
        this.#isEndingWithBlockComments = new CodeService().isEndingWithBlockComments(this);
        return this.#isEndingWithBlockComments;
    }


    get hasNode(): boolean {
        return !this.isCommented /* fdsfsfsd */ && !this.isEmpty; /**
         eeee
         */
    }


    /**
     * Checks if a line is commented
     */
    get isCommented(): boolean {
        return this.text.trim().slice(0, 2) === `//` || this.text.trim().slice(0, 2) === `/*`;
    }


    get isEmpty(): boolean {
        return !this.text;
    }


    get lengthWithoutComments(): number {
        return
    }


    get previousLine(): CodeLine {
        return this.issue > 1 ? this.code?.lines?.[this.issue - 2] : undefined;
    }



    get textWithoutComments(): string {
        return
    }

    /**
     * Sets the depth and nesting complexity to this CodeLine
     */
    setDepthAndNestingCpx(): void {
        this.cpxFactors.nesting = new NestingCpx();
        this.cpxFactors.depth = new DepthCpx();
        for (const astNode of this.astNodes) {
            if (astNode.intrinsicNestingCpx > 0) {
                this.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.cpxFactors?.depth);
                this.cpxFactors.nesting = addObjects(this.cpxFactors.nesting, astNode.parent?.cpxFactors?.nesting);
            }
            if (astNode.intrinsicDepthCpx > 0) {
                this.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.parent?.cpxFactors?.depth);
            }
        }
    }
}
