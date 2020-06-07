import { TreeNode } from './tree-node.model';
import { Ast } from '../../services/ast.service';
import { NodeFeature } from '../../enums/node-feature.enum';

export class Context {

    #params?: string[] = undefined;
    #treeNode?: TreeNode = undefined;

    constructor() {
    }


    get isFunction(): boolean {
        return this.treeNode.feature === NodeFeature.FUNC;
    }


    get params(): string[] {
        return this.#params ?? this.initParams();
    }


    get treeNode(): TreeNode {
        return this.#treeNode ?? this.init().treeNode;
    }


    // set treeNode(treeNode: TreeNode) {
    //     this.#treeNode = treeNode;
    // }


    init(treeNode?: TreeNode): Context {
        this.#treeNode = treeNode ?? new TreeNode();
        this.initParams();
        return this;
    }


    private initParams(): string[] {
        if (!this.isFunction) {
            return undefined;
        }
        this.#params = this.treeNode.children.filter(c => Ast.isParam(c.node)).map(e => e.name);
        return this.#params;
    }
}
