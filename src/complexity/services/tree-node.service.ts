import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TreeNode } from '../models/tree-node.model';
import { TreeMethod } from '../models/tree-method.model';
import { ComplexityService as CS } from './complexity.service';

/**
 * Service managing TreeNodes
 */
export class TreeNodeService {

    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param treeMethod    // The TreeMethod in question
     */
    generateTree(treeMethod: TreeMethod): TreeNode {
        let treeNode: TreeNode = new TreeNode();
        treeNode.node = treeMethod.node;
        treeNode.nestingCpx = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = Ast.getType(treeMethod.node);
        treeNode = this.addTreeToChildren(treeNode);
        return treeNode;
    }


    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subChildren
     * @param treeNode
     */
    addTreeToChildren(treeNode: TreeNode): TreeNode {
        ts.forEachChild(treeNode.node, (childNode: ts.Node) => {
            const newTree = new TreeNode();
            childNode.parent = treeNode.node;
            newTree.node = childNode;
            newTree.treeMethod = treeNode.treeMethod;
            newTree.parent = treeNode;
            newTree.kind = Ast.getType(childNode);
            newTree.nestingCpx = newTree.calculateNestingCpx();
            newTree.cognitiveCpxByIncrementType = CS.getTreeLocalCognitiveCpx(newTree);
            treeNode.children.push(this.addTreeToChildren(newTree));
        });
        return treeNode;
    }
}
