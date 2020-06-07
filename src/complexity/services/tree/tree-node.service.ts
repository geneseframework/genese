import * as ts from 'typescript';
import { Ast } from '../ast.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { ParentFunction } from '../../models/tree/parent-function.model';

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
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            this.setParentFunction(newTree);
            console.log('KIND', newTree.kind, newTree.name)
            if (newTree.kind ==='IfStatement') {
                console.log('IFFFFF', newTree.name, 'NEST', newTree.cpxFactors.totalNesting, 'PT ', newTree.parent.cpxFactors.nesting)
            }
            if (newTree.parent.kind ==='IfStatement') {
                console.log('PARENT IFFFF', newTree.name, 'NEST', newTree.cpxFactors.totalNesting, 'PT ', newTree.parent.cpxFactors.nesting)
            }
        });
        return treeNode;
    }


    setParentFunction(treeNode: TreeNode): ParentFunction {
        return (treeNode.isFunction) ? this.createParentFunction(treeNode) : this.getParentFunction(treeNode);
    }


    createParentFunction(treeNode: TreeNode): ParentFunction {
        const parentFunction = new ParentFunction();
        return parentFunction.init(treeNode);
    }


    getParentFunction(treeNode: TreeNode): ParentFunction {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            return treeNode.parentFunction;
        }
        if (treeNode.parent.isFunction) {
            return treeNode.parent.parentFunction;
        } else {
            return this.getParentFunction(treeNode.parent);
        }
    }


    isCallback(treeNode: TreeNode): boolean {
        return treeNode.isMethodIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    }


    isRecursion(treeNode: TreeNode): boolean {
        return treeNode.name === treeNode.parentFunction.name && treeNode.isMethodIdentifier && !treeNode.parent?.isFunction && !treeNode.parent?.isParam;
    }
}
