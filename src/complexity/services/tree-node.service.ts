import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TreeNode } from '../models/tree-node.model';
import { TreeMethod } from '../models/tree-method.model';
import { ComplexityService as CS } from './complexity.service';
import { Options } from '../models/options';

/**
 * Service managing TreeNodes
 */
export class TreeNodeService {

    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param treeMethod    // The TreeMethod in question
     */
    static generateTree(treeMethod: TreeMethod): TreeNode {
        let treeNode: TreeNode = new TreeNode();
        treeNode.node = treeMethod.node;
        treeNode.nesting = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = Ast.getType(treeMethod.node);
        treeNode = TreeNodeService.addTreeToChildren(treeNode)
        return treeNode;
    }


    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subchildren
     * @param treeNode
     */
    static addTreeToChildren(treeNode: TreeNode): TreeNode {
        const depth: number = treeNode.nesting;
        ts.forEachChild(treeNode.node, (childNode: ts.Node) => {
            const newTree = new TreeNode();
            childNode.parent = treeNode.node;
            newTree.node = childNode;
            newTree.nesting = CS.getNesting(childNode, depth);
            newTree.treeMethod = treeNode.treeMethod;
            newTree.parent = treeNode;
            newTree.kind = Ast.getType(childNode);
            newTree.cognitiveCpxByIncrementType = CS.getTreeLocalCognitiveCpx(newTree);
            newTree.increasesCognitiveComplexity = CS.increaseBreakFlow(newTree);
            treeNode.children.push(TreeNodeService.addTreeToChildren(newTree));
        });
        return treeNode;
    }
}
