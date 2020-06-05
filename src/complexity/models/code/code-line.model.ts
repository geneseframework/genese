import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { NestingCpx } from '../cpx-factor/nesting-cpx.model';
import { TreeNode } from '../tree/tree-node.model';
import { addObjects } from '../../services/tools.service';
import { Ast } from '../../services/ast.service';

/**
 * A line of a Code object
 */
export class CodeLine {

    cpxFactors?: CpxFactors = new CpxFactors();             // The complexity factors relative to this line (breakFlows, increments,...)
    issue ?= 0;                                             // The number of the line in its Code context (method)
    position ?= 0;                                          // The position (in number of characters) of the start of the line
    text ?= '';                                             // The text of the line
    treeNodes?: TreeNode[] = [];


    setNestingCpx(): number {
        let nestingCpx = 0;
        this.cpxFactors.nesting = new NestingCpx();
        for (const treeNode of this.treeNodes) {
            console.log('KIND', Ast.getType(treeNode.node), 'NESTING', treeNode.cpxFactors.totalNesting, 'INTRS NEST', treeNode.intrinsicNestingCpx, 'FEATURE', treeNode.feature)
            // if (treeNode.cpxFactors.totalNesting > 0) {
            if (treeNode.intrinsicNestingCpx > 0) {
                nestingCpx += treeNode.parent?.cpxFactors?.totalNesting;
                this.cpxFactors.nesting = addObjects(this.cpxFactors.nesting, treeNode.parent?.cpxFactors?.nesting);
            }
        }
        return nestingCpx;
    }
}
