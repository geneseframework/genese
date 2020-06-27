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
     * @param text  // The content of the code
     */
    static getCode(text) {
        const code = new code_model_1.Code();
        code.text = text;
        const textLines = text.split('\n');
        let issue = 1;
        let pos = 0;
        for (const textLine of textLines) {
            const line = new code_line_model_1.CodeLine();
            line.text = textLine;
            line.issue = issue;
            line.position = pos;
            code.lines.push(line);
            code.maxLineLength = code.maxLineLength < textLine.length ? textLine.length : code.maxLineLength;
            issue++;
            pos = textLine ? pos + textLine.length + 1 : pos;
            console.log('POSITIONNNN LINNN', pos);
        }
        return code;
    }
    /**
     * Returns the number of the CodeLine at a given position in the code
     * @param code      // The Code where to search
     * @param position  // The position where we search the number of its line
     */
    getLineIssue(code, position) {
        var _a, _b;
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (let i = 0; i < code.lines.length; i++) {
            if (position < ((_a = code.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.position)) {
                issue = ((_b = code.lines[i]) === null || _b === void 0 ? void 0 : _b.issue) - 1;
                console.log('LINNNNN', position, code.lines[i].position, code.lines[i].text, code.lines[i].issue);
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
        return issue;
    }
}
exports.CodeService = CodeService;
