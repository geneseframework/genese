"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Code {
    constructor() {
        this.lines = [];
        this.maxLineWidth = 0;
        this.text = '';
    }
    setTextWithLines() {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }
    addComment(comment, line) {
        const updatedLine = {
            position: line === null || line === void 0 ? void 0 : line.position,
            text: line === null || line === void 0 ? void 0 : line.text
        };
        const txt = `${updatedLine.text} // `;
        updatedLine.text = `${txt.padEnd(this.maxLineWidth + 10, '-')} ${comment}`;
        return updatedLine;
    }
}
exports.Code = Code;
