import { TreeNode } from './tree-node.model';

export class Context {

    #params?: string[] = undefined;
    treeNode?: TreeNode = new TreeNode();

    constructor() {
    }
}
