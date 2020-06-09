import { TreeNode } from './tree-node.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { Ast } from '../../services/ast.service';

export class Context {


    #name?: string = undefined;
    #params?: string[] = undefined;
    #treeNode?: TreeNode = undefined;

    constructor() {
    }


    get isFunction(): boolean {
        return this.treeNode.feature === NodeFeature.FUNC;
    }


    get name(): string {
        return this.#name ?? this.treeNode.name;
    }


    get params(): string[] {
        return this.#params ?? this.initParams();
    }


    get treeNode(): TreeNode {
        return this.#treeNode ?? this.init().treeNode;
    }


    init(treeNode?: TreeNode): Context {
        this.#treeNode = treeNode ?? new TreeNode();
        this.initParams();
        return this;
    }


    private initParams(): string[] {
        if (!this.isFunction) {
            return [];
        }
        this.#params = this.treeNode.children.filter(c => Ast.isParam(c.node)).map(e => e.name);
        return this.#params;
    }

}