"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const chalk = require('chalk');
class LogService {
    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Logs all the AST of the AstNode of a given AstMethod
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
        var _a, _b, _c, _d;
        let color = '';
        if (((_a = childAst.cpxFactors) === null || _a === void 0 ? void 0 : _a.total) < 0.5) {
            color = 'white';
        }
        else {
            color = ((_b = childAst.cpxFactors) === null || _b === void 0 ? void 0 : _b.total) > 1 ? 'red' : 'yellow';
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
        logs.push(chalk.blueBright((_c = childAst.context) === null || _c === void 0 ? void 0 : _c.name));
        logs.push('parent :');
        logs.push(chalk.greenBright((_d = childAst.parent) === null || _d === void 0 ? void 0 : _d.kind));
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
