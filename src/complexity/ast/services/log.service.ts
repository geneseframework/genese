import { AstNode } from '../models/ast-node.model';

const chalk = require('chalk');

export class LogService {



    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    static printAllChildren(astNode: AstNode){
        console.log('------------------------------------');
        console.log('METHOD ', astNode.name, ' : ', astNode.astMethod?.cpxIndex);
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
    private static printChildren(astNode: AstNode, indent: string) {
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
    private static logAstNode(childAst: AstNode, indent: string): void {
        let color = '';
        if (childAst.cpxFactors.total < 0.5) {
            color = 'white';
        } else {
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
        logs.push(chalk.blueBright(childAst.context?.name));
        logs.push('parent :');
        logs.push(chalk.greenBright(childAst.parent?.kind));
        console.log(...logs)


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
