import * as ts from 'typescript';
import { Ast } from './ast.service';
import { Tree } from '../models/tree.model';
import { TreeMethod } from '../models/tree-method.model';
import { ComplexityService as CS } from './complexity.service';
import { Options } from '../models/options';


export class TsTreeService {

    static generateTree(treeMethod: TreeMethod): Tree {
        let tsTree: Tree = new Tree();
        tsTree.node = treeMethod.node;
        tsTree.depth = 0;
        tsTree.treeMethod = treeMethod;
        tsTree.kind = Ast.getType(treeMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree)
        return tsTree;
    }


    static addTreeToChildren(tsTree: Tree): Tree {
        const depth: number = tsTree.depth;
        ts.forEachChild(tsTree.node, (childNode: ts.Node) => {
            const newTree = new Tree();
            childNode.parent = tsTree.node;
            newTree.node = childNode;
            newTree.depth = CS.increaseNesting(childNode, depth);
            newTree.treeMethod = tsTree.treeMethod;
            newTree.parent = tsTree;
            newTree.kind = Ast.getType(childNode);
            newTree.increasesCognitiveComplexity = CS.increaseBreakFlow(newTree);
            tsTree.children.push(TsTreeService.addTreeToChildren(newTree));
        });
        return tsTree;
    }
}
