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
        treeNode.parent = treeMethod?.treeFile?.treeNode;
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
            newTree.treeFile = treeNode.treeFile;
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            // console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context?.kind);
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            // newTree.context = this.getContext(newTree);
            // this.setParentFunction(newTree);
        });
        return treeNode;
    }


    getContext(treeNode: TreeNode): TreeNode {
        if (!treeNode) {
            return undefined;
        }
        switch (treeNode.node?.kind) {
            case ts.SyntaxKind.SourceFile:
                return treeNode;
            case ts.SyntaxKind.Identifier:
                return this.getIdentifierContext(treeNode);
            case ts.SyntaxKind.ThisKeyword:
                return treeNode.parent?.context?.context;
            default:
                if (treeNode.parent?.mayDefineContext) {
                    return treeNode.parent;
                } else {
                    return treeNode.parent?.context;
                    // return this.getContext(treeNode.parent);
                }
        }
    }


    private getIdentifierContext(treeNode: TreeNode): TreeNode {
        let context: TreeNode;
        if (this.isSecondSonOfPropertyAccessExpression(treeNode)) {
            console.log(treeNode.kind, treeNode.name, 'IS SECOND SON OF', treeNode.parent.kind, treeNode.parent?.name);
            context = treeNode.parent?.firstSon?.mayDefineContext ? treeNode.parent?.firstSon : treeNode.parent?.firstSon.context;
        } else {
            console.log(treeNode.kind, treeNode.name, 'HAS CONTEXT', treeNode.parent.context.kind, treeNode.parent.context?.name);
            context = treeNode.parent?.context;
            // context = this.getContext(treeNode.parent);
        }
        return context;
    }


    isSecondSonOfPropertyAccessExpression(treeNode: TreeNode): boolean {
        // if (Ast.isPropertyAccessExpression(treeNode?.parent?.node) && treeNode === treeNode?.parent.secondSon) {
        //     console.log(treeNode.kind, treeNode.name, 'IS SON OF', treeNode.parent?.kind,  treeNode.parent?.name);
        // }
        return Ast.isPropertyAccessExpression(treeNode?.parent?.node) && treeNode === treeNode?.parent.secondSon;
    }


    getSon(treeNode: TreeNode, sonNumber: number) {
        return treeNode.children[sonNumber];
        // return Ast.getSon(treeNode?.node, treeNode?.sourceFile, sonNumber);
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
