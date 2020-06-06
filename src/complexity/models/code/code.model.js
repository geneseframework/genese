"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
    The TypeScript code seen as an array of CodeLine
 */
class Code {
    constructor() {
        this.lines = []; // The lines of the code
        this.maxLineLength = 0; // The max length of the lines of the code
        this.text = ''; // The code himself (as string)
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
    setLinesNestingCpx() {
        for (const line of this.lines) {
            line.setNestingCpx();
        }
    }
}
exports.Code = Code;
