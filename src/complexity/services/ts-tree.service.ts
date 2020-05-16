import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TsTree } from '../models/ts-tree.model';
import { TsMethod } from '../models/ts-method.model';
import { ComplexityService as CS } from './complexity.service';


export class TsTreeService {

    static generateTree(tsMethod: TsMethod): TsTree {
        let tsTree: TsTree = new TsTree();
        tsTree.node = tsMethod.node;
        tsTree.depth = 0;
        tsTree.tsMethod = tsMethod;
        tsTree.kind = Ast.getType(tsMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree)
        return tsTree;
    }


    static addTreeToChildren(tsTree: TsTree): TsTree {
        const depth: number = tsTree.depth;
        ts.forEachChild(tsTree.node, (childNode: ts.Node) => {
            const newTree = new TsTree();
            childNode.parent = tsTree.node;
            newTree.node = childNode;
            newTree.depth = CS.increaseDepth(childNode, depth);
            newTree.tsMethod = tsTree.tsMethod;
            newTree.parent = tsTree;
            newTree.kind = Ast.getType(childNode);
            newTree.increasesCognitiveComplexity = CS.increasesCognitiveComplexity(newTree);
            tsTree.children.push(TsTreeService.addTreeToChildren(newTree));
        });
        return tsTree;
    }
}
