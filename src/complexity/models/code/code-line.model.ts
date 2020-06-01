import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { NestingCpx } from '../cpx-factor/nesting-cpx.model';
import { TreeNode } from '../tree/tree-node.model';
import { Ast } from '../../services/ast.service';
import { NodeFeatureService } from '../../services/node-feature.service';
import { addObjects } from '../../services/tools.service';

/**
 * A line of a Code object
 */
export class CodeLine {

    cpxFactors?: CpxFactors = new CpxFactors();             // The complexity factors relative to this line (breakFlows, increments,...)
    issue ?= 0;                                             // The number of the line in its Code context (method)
    #nestingCpx: number = undefined;
    nodeFeatureService?: NodeFeatureService = new NodeFeatureService();
    position ?= 0;                                          // The position (in number of characters) of the start of the line
    text ?= '';                                             // The text of the line
    treeNodes?: TreeNode[] = [];


    get nestingCpx(): number {
        return this.#nestingCpx ?? this.setNestingCpx();
    }

    setNestingCpx(): number {
        console.log('LINE ', this.issue);
        let nestingCpx = 0;
        this.cpxFactors.nesting = new NestingCpx();
        for (const treeNode of this.treeNodes) {
            console.log('KIND', Ast.getType(treeNode.node), 'NESTING', treeNode.cpxFactors.totalNesting, 'INTRS NEST', treeNode.intrinsicNestingCpx, 'FEATURE', treeNode.feature)
            if (treeNode.intrinsicNestingCpx > 0) {
                nestingCpx += treeNode.parent?.cpxFactors?.totalNesting;
                this.cpxFactors.nesting = addObjects(this.cpxFactors.nesting, treeNode.parent?.cpxFactors?.nesting);
            }
        }
        console.log('NESTTT CPXAFA', this.cpxFactors.nesting);
        return nestingCpx;
    }
}
