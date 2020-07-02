"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
/**
    The TypeScript code seen as an array of CodeLine
 */
class Code {
    constructor() {
        this.lines = []; // The lines of the code
        this.maxLineLength = 0; // The max length of the lines of the code
        this.start = 0; // The absolute position of the code in the SourceFile
        this.text = ''; // The code itself (as string)
    }
    get end() {
        var _a, _b;
        return (_b = this.start + ((_a = this.text) === null || _a === void 0 ? void 0 : _a.length)) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * Sets the content of the code (as string) with its CodeLines
     */
    setTextWithLines() {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }
    /**
     * Add a comment at the end of a line of the code
     * @param comment   // The comment to add
     * @param line      // The CodeLine where to add the comment
     */
    addComment(comment, line) {
        const txt = `${line === null || line === void 0 ? void 0 : line.text} // `;
        return `${txt.padEnd(this.maxLineLength + 10, '-')} ${comment}`;
    }
    /**
     * Sets the nesting complexity to each CodeLine
     */
    setLinesDepthAndNestingCpx() {
        for (const line of this.lines) {
            line.setDepthAndNestingCpx();
        }
    }
}
exports.Code = Code;
