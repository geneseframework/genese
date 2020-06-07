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
        // console.log('TREENODE NAME', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
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
            // this.getContext(newTree);
            newTree.context = this.getContext(newTree);
            newTree.evaluate();
            // console.log('CHILD KIND', newTree.kind, 'TREENODE NAME', newTree.name, 'NAME PARENT', newTree.parent?.name)
            // console.log('----KIND', treeNode.kind, 'TREENODE NAME   ', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
        });
        // console.log('KIND', treeNode.kind, 'TREENODE NAMEc', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
        return treeNode;
    }


    getContext(treeNode: TreeNode): Context {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            // console.log('    IS FUNCTION', treeNode.kind, 'CTXT NAME', treeNode.context.name);
            return treeNode.context;
        }
        if (treeNode.parent.isFunction) {
            // console.log('    PARENT IS FUNCTION', treeNode.kind, 'CTXT NAME', treeNode.parent.context.name);
            return treeNode.parent.context;
        } else {
            // console.log('    ELSE ', treeNode.kind, 'CTXT NAME', treeNode.parent.context.name);
            return this.getContext(treeNode.parent);
        }
    }


    isCallback(treeNode: TreeNode): boolean {
        return false
        // return treeNode.context.params.includes(treeNode.name);
    }


    isRecursion(treeNode: TreeNode): boolean {
        // if (treeNode.name === treeNode.context.name && !treeNode.isFunction && !treeNode.parent?.isFunction) {
            // console.log('    IS RECURSION', treeNode.name, 'PARENT NAME', treeNode.parent.name)
            // console.log('    KIND', treeNode.kind, 'NAME', treeNode.name, 'CTXT NAME', treeNode.context.name)
        // }
        // console.log('BEFORE TR NAME', treeNode.name)
        const zzz = treeNode.context;
        console.log('ZZZ NAME', treeNode.name, ' CTXT', zzz.name)
        return treeNode.name === treeNode.context.name && treeNode.isIdentifier && !treeNode.parent?.isFunction && !treeNode.parent?.isParam;
        // return false
    }
}
