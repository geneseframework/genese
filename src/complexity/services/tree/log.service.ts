import { TreeNode } from '../../models/tree/tree-node.model';

const chalk = require('chalk');

export class LogService {



    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    static printAllChildren(treeNode: TreeNode){
        console.log('------------------------------------');
        console.log('METHOD ', treeNode.name, ' : ', treeNode.treeMethod?.cpxIndex);
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


    /**
     * Logs the AST of a TreeNode with its complexity factors, its context and its parent
     * @param childTree
     * @param indent
     */
    private static logTreeNode(childTree: TreeNode, indent: string): void {
        let color = '';
        if (childTree.cpxFactors.total < 0.5) {
            color = 'white';
        } else {
            color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
        }
        let logs = [];
        logs.push(indent);
        logs.push(chalk[color](childTree.kind));
        logs = logs.concat(LogService.addLog('structural', childTree.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', childTree.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', childTree.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', childTree.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', childTree.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright(childTree.context?.name));
        logs.push('parent :');
        logs.push(chalk.greenBright(childTree.parent?.kind));
        console.log(...logs)


    }


    /**
     * Adds a text with its value in a console.log if the value is positive
     * @param text      // The text to add
     * @param value     // The corresponding value
     */
    private static addLog(text: string, value: number): any[] {
        return value > 0 ? [text, value] : [];
    }

}
