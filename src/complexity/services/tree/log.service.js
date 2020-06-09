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
        this.logTreeNode(treeNode, '');
        this.printChildren(treeNode, ' ');
    }
    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    static printChildren(treeNode, indent) {
        for (const childTree of treeNode.children) {
            this.logTreeNode(childTree, indent);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }
    static logTreeNode(childTree, indent) {
        var _a, _b;
        let color = '';
        if (childTree.cpxFactors.total < 0.5) {
            color = 'white';
        }
        else {
            color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
        }
        console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'depth', childTree.depthCpx, 'aggr', childTree.aggregationCpx, 'context', chalk['blueBright']((_a = childTree.context) === null || _a === void 0 ? void 0 : _a.name), 'parent', (_b = childTree.parent) === null || _b === void 0 ? void 0 : _b.kind);
    }
}
exports.LogService = LogService;
