"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_model_1 = require("../models/code.model");
class CodeService {
    constructor() {
    }
    createCode(text) {
        const code = new code_model_1.Code();
        code.text = text;
        const textLines = text.split('\n');
        let issue = 1;
        let pos = 0;
        for (const textLine of textLines) {
            code.lines.push({ text: textLine, issue: issue, position: pos });
            code.maxLineWidth = code.maxLineWidth < textLine.length ? textLine.length : code.maxLineWidth;
            issue++;
            pos = textLine ? pos + textLine.length + 1 : pos;
        }
        return code;
    }
    getLineIssue(code, position) {
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (const line of code.lines) {
            if (position < (line === null || line === void 0 ? void 0 : line.position) + (line === null || line === void 0 ? void 0 : line.text.length)) {
                issue = (line === null || line === void 0 ? void 0 : line.issue) - 1;
                break;
            }
        }
        return issue;
    }
}
exports.CodeService = CodeService;
