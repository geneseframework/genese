import * as ts from 'typescript';
import { Ast } from '../ast.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { Context } from '../../models/tree/context.model';

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
            treeNode.children.push(this.addTreeToChildren(newTree));
            this.setParentFunction(newTree);
            // newTree.context = this.getContext(newTree);
            newTree.evaluate();
        });
        return treeNode;
    }


    setParentFunction(treeNode: TreeNode): Context {
        return (treeNode.isFunction) ? this.createParentFunction(treeNode) : this.getContext(treeNode);
    }


    createParentFunction(treeNode: TreeNode): Context {
        const context = new Context();
        context.init(treeNode);
        return context;
    }


    getContext(treeNode: TreeNode): Context {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            return treeNode.context;
        }
        if (treeNode.parent.isFunction) {
            return treeNode.parent.context;
        } else {
            return this.getContext(treeNode.parent);
        }
    }


    isCallback(treeNode: TreeNode): boolean {
        // return false
        return treeNode.context.params.includes(treeNode.name);
    }


    isRecursion(treeNode: TreeNode): boolean {
        return treeNode.name === treeNode.context.name && treeNode.isIdentifier && !treeNode.parent?.isFunction && !treeNode.parent?.isParam;
    }
}
