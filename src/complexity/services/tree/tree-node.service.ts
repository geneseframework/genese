import * as ts from 'typescript';
import { Ast } from '../ast.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { ParentFunction } from '../../models/tree/parent-function.model';
import { Context } from '../../models/tree/context.model';
import { MayDefineContext } from '../../enums/may-define-context.enum';

/**
 * Service managing TreeNodes
 */
export class TreeNodeService {

    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param treeMethod    // The TreeMethod in question
     * @param node
     */
    generateTree(treeMethod: TreeMethod, node: ts.Node): TreeNode {
        let treeNode: TreeNode = new TreeNode();
        treeNode.node = node;
        treeNode.nestingCpx = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = Ast.getType(node);
        treeNode.treeFile = treeMethod.treeFile;
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
            newTree.context = this.getContext(newTree);
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context.kind);
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            // this.setParentFunction(newTree);
        });
        return treeNode;
    }


    getContext(treeNode: TreeNode): TreeNode {
        let context: TreeNode;
        switch (treeNode?.node?.kind) {
            case ts.SyntaxKind.SourceFile:
                return treeNode;
            case ts.SyntaxKind.ClassDeclaration:
                return treeNode?.treeFile?.treeNode;
        }
        // console.log('NAME', treeNode.kind, treeNode.name, treeNode.isNodeContext, 'parent', treeNode.parent?.name);
        if (this.mayDefineContext(treeNode) || !treeNode.parent) {
            // console.log('CONTEXT OF', treeNode.name)
            treeNode.context = treeNode;
            context = treeNode;
        } else if (!Ast.isIdentifier(treeNode.node)) {
            context = this.getContext(treeNode.parent);
        } else {
            context = this.getIdentifierContext(treeNode);
        }
        // console.log('ZZZ CONTEXT OF ', treeNode.kind, treeNode.name, ' = ', context.kind);
        return context;
    }


    private getIdentifierContext(treeNode: TreeNode): TreeNode {
        let context: TreeNode;
        if (Ast.isPropertyAccessExpression(treeNode.parent?.context?.node)) {

        } else {
            context = this.getContext(treeNode.parent);
        }
        return context;
    }


    mayDefineContext(treeNode: TreeNode): boolean {
        return Object.values(MayDefineContext).includes(treeNode.kind);
    }


    createContext(treeNode: TreeNode): Context {
        const context = new Context();
        return context.init(treeNode);
    }


    // getContext(treeNode: TreeNode): Context {
    //     if (!treeNode) {
    //         return undefined;
    //     }
    //     if (treeNode.isFunction) {
    //         return treeNode.context;
    //     }
    //     if (treeNode.parent.isFunction) {
    //         return treeNode.parent.context;
    //     } else {
    //         return this.getContext(treeNode.parent);
    //     }
    // }


    // setParentFunction(treeNode: TreeNode): ParentFunction {
    //     return (treeNode.isFunction) ? this.createParentFunction(treeNode) : this.getParentFunction(treeNode);
    // }
    //
    //
    //
    // createParentFunction(treeNode: TreeNode): ParentFunction {
    //     const parentFunction = new ParentFunction();
    //     return parentFunction.init(treeNode);
    // }


    // getParentFunction(treeNode: TreeNode): ParentFunction {
    //     if (!treeNode) {
    //         return undefined;
    //     }
    //     if (treeNode.isFunction) {
    //         return treeNode.parentFunction;
    //     }
    //     if (treeNode.parent.isFunction) {
    //         return treeNode.parent.parentFunction;
    //     } else {
    //         return this.getParentFunction(treeNode.parent);
    //     }
    // }
    //
    //
    // isCallback(treeNode: TreeNode): boolean {
    //     return treeNode.isMethodIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    // }
    //
    //
    // isRecursion(treeNode: TreeNode): boolean {
    //     return treeNode.name === treeNode.parentFunction.name && treeNode.isMethodIdentifier && !treeNode.parent?.isFunction && !treeNode.parent?.isParam;
    // }
}
