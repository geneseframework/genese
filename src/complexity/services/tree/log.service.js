"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
class LogService {
    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------   PRINT AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    static printAllChildren(treeNode) {
        var _a;
        console.log('------------------------------------');
        console.log('METHOD ', (_a = treeNode.treeMethod) === null || _a === void 0 ? void 0 : _a.name);
        console.log('------------------------------------');
        this.printChildren(treeNode, ' ');
    }
    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    static printChildren(tsTree, indent) {
        for (const childTree of tsTree.children) {
            let color = '';
            if (childTree.cpxFactors.total < 0.5) {
                color = 'white';
            }
            else {
                color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
            }
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'depth', childTree.depthCpx, 'aggr', childTree.aggregationCpx, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }
}
exports.LogService = LogService;
