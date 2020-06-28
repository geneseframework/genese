import { AstNode } from '../models/ast/ast-node.model';
import { CodeLine } from '../models/code/code-line.model';
import { AstMethod } from '../models/ast/ast-method.model';
import { Code } from '../models/code/code.model';

const chalk = require('chalk');

export class LogService {



    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



    /**
     * Logs all the AST of the AstNode of a given AstMethod
     * This method runs, but is not yet used
     */
    static logMethod(astMethod: AstMethod, logLines = false): void {
        if (!astMethod?.astNode) {
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
    private static logMethodChildren(astNode: AstNode, indent: string) {
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
    static logAstNode(astNode: AstNode, indent: string): void {
        let color = '';
        if (astNode.cpxFactors?.total < 0.5) {
            color = 'white';
        } else {
            color = astNode.cpxFactors?.total > 1 ? 'red' : 'yellow';
        }
        let logs: string[] = [];
        logs.push(indent);
        logs.push(chalk[color](astNode.kind));
        logs = logs.concat(LogService.addLog('structural', astNode.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', astNode.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', astNode.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', astNode.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', astNode.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright(astNode.context?.name));
        logs.push('parent :');
        logs.push(chalk.greenBright(astNode.parent?.kind));
        console.log(...logs)
    }


    static logCode(code: Code, astNode: AstNode): void {
        for (const line of code.lines ?? []) {
            this.logCodeLine(line, astNode);
        }
    }


    static logCodeLine(line: CodeLine, astNode?: AstNode): void {
        console.log('LINE ', chalk.greenBright(line.issue), line.pos, '-', line.text ? line.pos + line.text?.length + 1 : line.pos, line.isEndingWithBlockComments, line.text?.slice(0,20))
        if (astNode?.pos) {
            console.log(...this.logCodeLineNode(line, astNode, astNode.pos));
        }
    }


    private static logCodeLineNode(line: CodeLine, astNode: AstNode, methodPosition: number, logs: string[] = []): string[] {
        if (this.isAstNodeInCodeLine(astNode, line)) {
            logs.push(chalk.blueBright(astNode.kind));
            logs.push((astNode.pos - methodPosition).toString())
        }
        for (const childAstNode of astNode.children) {
            if (this.isAstNodeInCodeLine(childAstNode, line)) {
                logs.push(chalk.blueBright(childAstNode.kind));
                logs = logs.concat([childAstNode.pos.toString(), line.pos.toString(), line.end.toString()])
                this.logCodeLineNode(line, childAstNode, methodPosition, logs);
            }
        }
        return logs;
    }


    private static isAstNodeInCodeLine(astNode: AstNode, line: CodeLine): boolean {
        return line.hasNode && astNode.pos >= line.pos && astNode.pos <= line.end;
    }

    /**
     * Adds a text with its value in a console.logg if the value is positive
     * @param text      // The text to add
     * @param value     // The corresponding value
     */
    private static addLog(text: string, value: number): any[] {
        return value > 0 ? [text, value] : [];
    }

}
