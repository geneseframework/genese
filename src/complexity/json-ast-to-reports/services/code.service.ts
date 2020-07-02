import { Code } from '../models/code/code.model';
import { CodeLine } from '../models/code/code-line.model';
import * as chalk from 'chalk';
import { LogService } from './log.service';

/**
 * Service managing Code objects
 */
export class CodeService {


    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text      // The content of the code
     * @param pos
     */
    static getCode(text: string, pos: number): Code {
        if (!text) {
            return undefined;
        }
        const code: Code = new Code();
        code.text = text;
        const textLines: string[] = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            console.log('TEXTLINNNNN', textLine, '|', pos)
            const line = new CodeLine();
            line.code = code;
            line.text = textLine;
            line.issue = issue;
            line.pos = pos;
            line.start = line.pos + code.start;
            line.end = pos + textLine.length + 1;
            code.lines.push(line);
            code.maxLineLength = code.maxLineLength < textLine.length ? textLine.length : code.maxLineLength;
            issue++;
            pos = line.end;
        }
        code.lines[code.lines.length - 1].end = text.length;
        return code;
    }


    /**
     * Returns the number of the CodeLine at a given position in the code
     * @param code      // The Code where to search
     * @param position  // The position where we search the number of its line
     */
    getLineIssue(code: Code, position: number): number {
        // console.log('ORIGGGG', code.text)
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (let i = 0; i < code.lines.length; i++) {
            if (position < code.lines[i + 1]?.pos) {
                issue = code.lines[i]?.issue - 1;
                // console.log('LINNNNN', position, code.lines[i].start, code.lines[i].text, code.lines[i].issue)
                break;
            }
        }
        // for (const line of code.lines) {
        //     if (position < line?.position + line?.text.length) {
        //         issue = line?.issue - 1;
        //         console.log('LINNNNN', position, line.position, line.text, line.issue)
        //         break;
        //     }
        // }
        // console.log('ISSSUUUUUEEEE', issue)
        return issue;
    }



    isEndingWithBlockComments(line: CodeLine): boolean {
        const text = line.textWithoutSlashComments;
        if (line.previousLine?.isEndingWithBlockComments) {
            const splitEndBlockComments = text.split(/\*\//);
            if (splitEndBlockComments.length === 1) {
                return true;
            }
            const lastElement = splitEndBlockComments[splitEndBlockComments.length - 1];
            return /\/\*/.test(lastElement) ?? false;
        }
        const splittedText = text?.split(/\/\*/);
        if (splittedText.length === 1) {
            return false;
        }
        const lastCommentedBlock = splittedText[splittedText.length - 1];
        return !/\*\//.test(lastCommentedBlock) ?? false;
    }


}
