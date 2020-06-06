import { TreeNode } from '../../models/tree/tree-node.model';

const chalk = require('chalk');

export class LogService {



    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------   PRINT AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    static printAllChildren(treeNode: TreeNode){
        console.log('------------------------------------');
        console.log('METHOD ', treeNode.treeMethod?.name);
        console.log('------------------------------------');
        this.logTreeNode(treeNode, '');
        this.printChildren(treeNode, ' ');
    }


    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    private static printChildren(treeNode: TreeNode, indent: string) {
        for (const childTree of treeNode.children) {
            this.logTreeNode(childTree, indent);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }


    private static logTreeNode(childTree: TreeNode, indent: string): void {
        let color = '';
        if (childTree.cpxFactors.total < 0.5) {
            color = 'white';
        } else {
            color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
        }
        console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'depth', childTree.depthCpx, 'aggr', childTree.aggregationCpx, 'parent', childTree.parent?.kind);


    }

}
