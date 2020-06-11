import * as ts from 'typescript';
import { Ast } from '../ast.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { MayDefineContext } from '../../enums/may-define-context.enum';
import { TreeMethodService } from './tree-method.service';
import { TreeMethod } from '../../models/tree/tree-method.model';
import * as chalk from 'chalk';

/**
 * Service managing TreeNodes
 */
export class TreeNodeService {

    treeMethodService: TreeMethodService = new TreeMethodService();

    constructor() {
    }

    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param parentTreeNode
     * @param node
     */
    // generateTree(parentTreeNode: TreeNode, node: ts.Node): TreeNode {
    //     let treeNode: TreeNode = new TreeNode();
    //     treeNode.node = node;
    //     treeNode.nestingCpx = 0;
    //     treeNode.parent = parentTreeNode;
    //     treeNode.treeMethod = Ast.isMethodDeclaration(node) ? this.treeMethodService.generateTree(treeNode) : parentTreeNode.treeMethod;
    //     // treeNode.kind = Ast.getKind(node);
    //     treeNode.treeFile = parentTreeNode?.treeFile;
    //     treeNode = this.createTreeNodeChildren(treeNode);
    //     return treeNode;
    // }
    // generateTree(treeMethod: TreeMethod, node: ts.Node): TreeNode {
    //     let treeNode: TreeNode = new TreeNode();
    //     treeNode.node = node;
    //     treeNode.nestingCpx = 0;
    //     treeNode.parent = treeMethod?.treeFile?.treeNode;
    //     treeNode.treeMethod = treeMethod;
    //     treeNode.kind = Ast.getKind(node);
    //     treeNode.treeFile = treeMethod.treeFile;
    //     treeNode = this.createTreeNodeChildren(treeNode);
    //     return treeNode;
    // }


    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subChildren
     * @param treeNode
     */
    createTreeNodeChildren(treeNode: TreeNode): TreeNode {
        ts.forEachChild(treeNode.node, (childNode: ts.Node) => {
            const newTree = new TreeNode();
            childNode.parent = treeNode.node;
            newTree.node = childNode;
            newTree.treeMethod = treeNode.treeMethod;
            newTree.parent = treeNode;
            newTree.kind = Ast.getKind(childNode);
            newTree.treeFile = treeNode.treeFile;
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            // console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context?.kind);
            // treeNode.treeMethod = Ast.isMethodDeclaration(treeNode.node) ? this.treeMethodService.generatefTree(treeNode) : treeNode.treeMethod;
            treeNode.children.push(this.createTreeNodeChildren(newTree));
            // newTree.evaluate();
            // newTree.context = this.getContext(newTree);
            // this.setParentFunction(newTree);
        });
        // console.log('CHILDRENNN', treeNode.kind, treeNode.children.length)
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
        if (this.isSecondSonOfPropertyAccessExpression(treeNode)) {
            return treeNode.parent?.firstSon?.mayDefineContext ? treeNode.parent?.firstSon : treeNode.parent?.firstSon.context;
        } else {
            return treeNode.parent?.context;
        }
    }


    isSecondSonOfPropertyAccessExpression(treeNode: TreeNode): boolean {
        return Ast.isPropertyAccessExpression(treeNode?.parent?.node) && treeNode === treeNode?.parent.secondSon;
    }


    getSon(treeNode: TreeNode, sonNumber: number) {
        return treeNode.children[sonNumber];
    }


    mayDefineContext(treeNode: TreeNode): boolean {
        return Object.values(MayDefineContext).includes(treeNode.kind);
    }


    // isCallback(treeNode: TreeNode): boolean {
    //     return treeNode.isMethodIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    // }
    //
    //
    isRecursiveMethod(treeNode: TreeNode): boolean {
        if (!treeNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        // console.log('TRMTHD', treeNode.kind, treeNode.treeMethod)
        return this.hasRecursiveNode(treeNode.treeMethod, treeNode);
    }


    private hasRecursiveNode(treeNodeMethod: TreeMethod, treeNode?: TreeNode): boolean {
        console.log('HAS RECURSIVE ? ', treeNode.kind, treeNode.name, chalk['blueBright'](treeNode.context.name))
        for (const childTreeNode of treeNode?.children) {
            console.log('METHOD', treeNodeMethod.name, chalk['blueBright'](treeNodeMethod.treeNode.context.name), 'NODE', childTreeNode.kind, childTreeNode.name)
            if (childTreeNode.name === treeNodeMethod.name && childTreeNode.context === treeNodeMethod.treeNode.context && !treeNode.isFunctionOrMethodDeclaration) {
                console.log('RETURN TRUE 1')
                return true;
            }
            if (this.hasRecursiveNode(treeNodeMethod, childTreeNode)) {
                console.log('RETURN TRUE 2')
                return true;
            }
        }
        console.log('RETURN FALSE')
        return false;
    }
}
