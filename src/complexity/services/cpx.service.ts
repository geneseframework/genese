import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TreeNode } from '../models/tree-node.model';

export class CpxService {

    cpx = 0;
    treeNode: TreeNode;

    getComplexity(treeNode: TreeNode): number {
        this.treeNode = treeNode;
        this.addIntrinsicCpx(treeNode);
        this.addChildrenCpx(treeNode);
        return this.cpx;
    }


    private addIntrinsicCpx(treeChild: TreeNode, treeParent?: TreeNode): void {
        let cpx = 0;
        console.log('CPX', Ast.getType(treeChild.node))
        this.cpx += cpx;
    }


    private addChildrenCpx(treeNode: TreeNode): void {
        for (const treeChild of treeNode.children) {
            this.addIntrinsicCpx(treeChild, treeNode);
            this.addChildrenCpx(treeChild);
        }
    }
}
