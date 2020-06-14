"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
class LogService {
    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    static printAllChildren(astNode) {
        var _a;
        console.log('------------------------------------');
        console.log('METHOD ', astNode.name, ' : ', (_a = astNode.astMethod) === null || _a === void 0 ? void 0 : _a.cpxIndex);
        console.log('------------------------------------');
        this.logAstNode(astNode, '');
        this.printChildren(astNode, ' ');
    }
    /**
     * Logs the AST of the children asts
     * This method runs, but is not yet used
     * @ast // The ast to print
     * @indent // the indentation to use for the print
     */
    static printChildren(astNode, indent) {
        for (const childAst of astNode.children) {
            this.logAstNode(childAst, indent);
            const newIndent = indent + '  ';
            this.printChildren(childAst, newIndent);
        }
    }
    /**
     * Logs the AST of a AstNode with its complexity factors, its context and its parent
     * @param childAst
     * @param indent
     */
    static logAstNode(childAst, indent) {
        var _a, _b;
        let color = '';
        if (childAst.cpxFactors.total < 0.5) {
            color = 'white';
        }
        else {
            color = childAst.cpxFactors.total > 1 ? 'red' : 'yellow';
        }
        let logs = [];
        logs.push(indent);
        logs.push(chalk[color](childAst.kind));
        logs = logs.concat(LogService.addLog('structural', childAst.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', childAst.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', childAst.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', childAst.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', childAst.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright((_a = childAst.context) === null || _a === void 0 ? void 0 : _a.name));
        logs.push('parent :');
        logs.push(chalk.greenBright((_b = childAst.parent) === null || _b === void 0 ? void 0 : _b.kind));
        console.log(...logs);
    }
    /**
     * Adds a text with its value in a console.logg if the value is positive
     * @param text      // The text to add
     * @param value     // The corresponding value
     */
    static addLog(text, value) {
        return value > 0 ? [text, value] : [];
    }
}
exports.LogService = LogService;
