"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
/**
    The TypeScript code seen as an array of CodeLine
 */
class Code {
    constructor() {
        this.lines = []; // The lines of the code
        this.start = 0; // The absolute pos of the code in the SourceFile
        this.text = ''; // The code itself (as string)
    }
    get end() {
        var _a, _b;
        return (_b = this.start + ((_a = this.text) === null || _a === void 0 ? void 0 : _a.length)) !== null && _b !== void 0 ? _b : 0;
    }
    getLine(issue) {
        return this.lines.find(l => l.issue === issue);
    }
    /**
     * Sets the content of the code (as string) with its CodeLines
     */
    setTextWithLines() {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
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
