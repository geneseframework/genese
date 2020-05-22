import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TreeNode } from '../models/tree.model';
import { TreeMethod } from '../models/tree-method.model';
import { ComplexityService as CS } from './complexity.service';
import { Options } from '../models/options';


export class TreeNodeService {

    static generateTree(treeMethod: TreeMethod): TreeNode {
        let treeNode: TreeNode = new TreeNode();
        treeNode.node = treeMethod.node;
        treeNode.nesting = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = Ast.getType(treeMethod.node);
        treeNode = TreeNodeService.addTreeToChildren(treeNode)
        return treeNode;
    }


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
            newTree.cognitiveCpx = CS.getTreeLocalCognitiveCpx(newTree);
            if (newTree.cognitiveCpx.total > 0) {
                console.log('COGCP+X', newTree.cognitiveCpx)
            }
            newTree.increasesCognitiveComplexity = CS.increaseBreakFlow(newTree);
            treeNode.children.push(TreeNodeService.addTreeToChildren(newTree));
        });
        return treeNode;
    }
}
