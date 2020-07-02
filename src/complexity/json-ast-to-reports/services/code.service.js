"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeService = void 0;
const code_model_1 = require("../models/code/code.model");
const code_line_model_1 = require("../models/code/code-line.model");
/**
 * Service managing Code objects
 */
class CodeService {
    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text      // The content of the code
     * @param pos
     */
    static getCode(text, pos) {
        if (!text) {
            return undefined;
        }
        const code = new code_model_1.Code();
        code.text = text;
        const textLines = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            console.log('TEXTLINNNNN', textLine, '|', pos);
            const line = new code_line_model_1.CodeLine();
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
    getLineIssue(code, position) {
        var _a, _b;
        // console.log('ORIGGGG', code.text)
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (let i = 0; i < code.lines.length; i++) {
            if (position < ((_a = code.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.pos)) {
                issue = ((_b = code.lines[i]) === null || _b === void 0 ? void 0 : _b.issue) - 1;
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
    isEndingWithBlockComments(line) {
        var _a, _b, _c;
        const text = line.textWithoutSlashComments;
        if ((_a = line.previousLine) === null || _a === void 0 ? void 0 : _a.isEndingWithBlockComments) {
            const splitEndBlockComments = text.split(/\*\//);
            if (splitEndBlockComments.length === 1) {
                return true;
            }
            const lastElement = splitEndBlockComments[splitEndBlockComments.length - 1];
            return (_b = /\/\*/.test(lastElement)) !== null && _b !== void 0 ? _b : false;
        }
        const splittedText = text === null || text === void 0 ? void 0 : text.split(/\/\*/);
        if (splittedText.length === 1) {
            return false;
        }
        const lastCommentedBlock = splittedText[splittedText.length - 1];
        return (_c = !/\*\//.test(lastCommentedBlock)) !== null && _c !== void 0 ? _c : false;
    }
}
exports.CodeService = CodeService;
