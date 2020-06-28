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
    static logMethod(astMethod, logLines = false) {
        if (!(astMethod === null || astMethod === void 0 ? void 0 : astMethod.astNode)) {
            console.log('Method undefined');
            return;
        }
        console.log('------------------------------------');
        console.log('METHOD ', astMethod.name, ' : ', astMethod.cpxIndex);
        console.log('------------------------------------');
        this.logAstNode(astMethod.astNode, '');
        this.logMethodChildren(astMethod.astNode, ' ');
        if (logLines) {
            this.logCode(astMethod.originalCode, astMethod.astNode);
        }
    }
    /**
     * Logs the AST of the children asts
     * This method runs, but is not yet used
     * @ast // The ast to print
     * @indent // the indentation to use for the print
     */
    static logMethodChildren(astNode, indent) {
        for (const childAst of astNode.children) {
            this.logAstNode(childAst, indent);
            const newIndent = indent + '  ';
            this.logMethodChildren(childAst, newIndent);
        }
    }
    /**
     * Logs the AST of a AstNode with its complexity factors, its context and its parent
     * @param astNode       // The AstNode to log
     * @param indent        // The current indentation
     */
    static logAstNode(astNode, indent) {
        var _a, _b, _c, _d;
        let color = '';
        if (((_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.total) < 0.5) {
            color = 'white';
        }
        else {
            color = ((_b = astNode.cpxFactors) === null || _b === void 0 ? void 0 : _b.total) > 1 ? 'red' : 'yellow';
        }
        let logs = [];
        logs.push(indent);
        logs.push(chalk[color](astNode.kind));
        logs = logs.concat(LogService.addLog('structural', astNode.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', astNode.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', astNode.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', astNode.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', astNode.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright((_c = astNode.context) === null || _c === void 0 ? void 0 : _c.name));
        logs.push('parent :');
        logs.push(chalk.greenBright((_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.kind));
        console.log(...logs);
    }
    static logCode(code, astNode) {
        var _a;
        for (const line of (_a = code.lines) !== null && _a !== void 0 ? _a : []) {
            this.logCodeLine(line, astNode);
        }
    }
    static logCodeLine(line, astNode) {
        var _a, _b;
        console.log('LINE ', chalk.greenBright(line.issue), line.pos, '-', line.text ? line.pos + ((_a = line.text) === null || _a === void 0 ? void 0 : _a.length) + 1 : line.pos, line.isEndingWithBlockComments, (_b = line.text) === null || _b === void 0 ? void 0 : _b.slice(0, 20));
        if (astNode === null || astNode === void 0 ? void 0 : astNode.pos) {
            console.log(...this.logCodeLineNode(line, astNode, astNode.pos));
        }
    }
    static logCodeLineNode(line, astNode, methodPosition, logs = []) {
        if (this.isAstNodeInCodeLine(astNode, line)) {
            logs.push(chalk.blueBright(astNode.kind));
            logs.push((astNode.pos - methodPosition).toString());
        }
        for (const childAstNode of astNode.children) {
            if (this.isAstNodeInCodeLine(childAstNode, line)) {
                logs.push(chalk.blueBright(childAstNode.kind));
                logs = logs.concat([childAstNode.pos.toString(), line.pos.toString(), line.end.toString()]);
                this.logCodeLineNode(line, childAstNode, methodPosition, logs);
            }
        }
        return logs;
    }
    static isAstNodeInCodeLine(astNode, line) {
        return line.hasNode && astNode.pos >= line.pos && astNode.pos <= line.end;
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
