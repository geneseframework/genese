import * as ts from 'typescript';
import { Code } from '../models/code/code.model';
import { CodeLine } from '../models/code/code-line.model';
import { TreeNode } from '../models/tree/tree-node.model';

/**
 * Service managing Code objects
 */
export class CodeService {

    constructor() {
    }


    /**
     * Gets the Code of a given AST node
     */
    getTreeNodeCode(treeNode: TreeNode): Code {
        return treeNode?.node ? this.getCode(treeNode.node.getFullText(treeNode.sourceFile)) : undefined;
    }


    /**
     * Gets the Code of a given AST node
     */
    getNodeCode(node: ts.Node, sourceFile: ts.SourceFile): Code {
        return this.getCode(node?.getFullText(sourceFile));
    }


    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text  // The content of the code
     */
    getCode(text: string): Code {
        const code: Code = new Code();
        code.text = text;
        const textLines: string[] = text.split('\n');
        let issue = 1;
        let pos = 0;
        for (const textLine of textLines) {
            const line = new CodeLine();
            line.text = textLine;
            line.issue = issue;
            line.position = pos;
            code.lines.push(line);
            code.maxLineLength = code.maxLineLength < textLine.length ? textLine.length : code.maxLineLength;
            issue++;
            pos = textLine ? pos + textLine.length + 1 : pos;
        }
        return code;
    }


    /**
     * Returns the number of the CodeLine at a given position in the code
     * @param code      // The Code where to search
     * @param position  // The position where we search the number of its line
     */
    getLineIssue(code: Code, position: number): number {
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (const line of code.lines) {
            if (position < line?.position + line?.text.length) {
                issue = line?.issue - 1;
                break;
            }
        }
        return issue;
    }

}
