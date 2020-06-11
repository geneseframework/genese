import * as ts from 'typescript';
import { Ast } from '../ast.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { MayDefineContext } from '../../enums/may-define-context.enum';
import { TreeMethodService } from './tree-method.service';
import { TreeMethod } from '../../models/tree/tree-method.model';

/**
 * Service managing TreeNodes
 */
export class TreeNodeService {

    treeMethodService: TreeMethodService = new TreeMethodService();

    constructor() {
    }


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
            treeNode.children.push(this.createTreeNodeChildren(newTree));
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


    isCallback(treeNode: TreeNode): boolean {
        if (!treeNode.isParam) {
            return false;
        }
        // console.log('PARAMMMMM', treeNode.kind, treeNode.name, 'CTXT', treeNode.context.name)
        const  zzz = this.hasCallBack(treeNode, treeNode.parent);
        // if (zzz) {
        //     console.log('ZZZ', zzz)
        // }
        return zzz
        // return treeNode.isCallIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    }


    isRecursiveMethod(treeNode: TreeNode): boolean {
        if (!treeNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        return this.hasRecursiveNode(treeNode.treeMethod, treeNode);
    }


    private hasRecursiveNode(treeNodeMethod: TreeMethod, treeNode?: TreeNode): boolean {
        for (const childTreeNode of treeNode?.children) {
            if (childTreeNode.name === treeNodeMethod.name && childTreeNode.context === treeNodeMethod.treeNode.context && !treeNode.isFunctionOrMethodDeclaration) {
                return true;
            }
            if (this.hasRecursiveNode(treeNodeMethod, childTreeNode)) {
                return true;
            }
        }
        return false;
    }


    private hasCallBack(treeNodeParam: TreeNode, treeNode?: TreeNode): boolean {
        for (const childTreeNode of treeNode?.children) {
            // console.log('    CHILD', childTreeNode.kind, childTreeNode.name, 'CTXT', childTreeNode.context.name, childTreeNode.isCallIdentifier)
            if (childTreeNode.name === treeNodeParam.name && childTreeNode.context === treeNodeParam.context && childTreeNode.isCallIdentifier) {
                // console.log('OKKKK')
                return true;
            }
            if (this.hasCallBack(treeNodeParam, childTreeNode)) {
                return true;
            }
        }
        return false;
    }
}
