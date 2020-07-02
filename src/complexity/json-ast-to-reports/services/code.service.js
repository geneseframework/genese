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
     * @param start
     */
    static getCode(text, start) {
        if (!text) {
            return undefined;
        }
        const code = new code_model_1.Code();
        code.start = start;
        code.text = text;
        const textLines = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            // console.log('TEXTLINNNNN', textLine, '|', start)
            const line = new code_line_model_1.CodeLine();
            line.code = code;
            line.text = textLine;
            line.issue = issue;
            line.start = start;
            line.end = start + textLine.length + 1;
            code.lines.push(line);
            code.maxLineLength = code.maxLineLength < textLine.length ? textLine.length : code.maxLineLength;
            issue++;
            start = line.end;
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
        var _a;
        if (position < 0 || position > (code === null || code === void 0 ? void 0 : code.end)) {
            return 0;
        }
        return (_a = code.lines.filter(l => l.start <= position && l.end > position)) === null || _a === void 0 ? void 0 : _a[0].issue;
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
