import { CodeLine } from './code-line.model';

/**
    The TypeScript code seen as an array of CodeLine
 */
export class Code {

    lines?: CodeLine[] = [];        // The lines of the code
    maxLineLength = 0;              // The max length of the lines of the code
    text = '';                      // The code himself (as string)

    constructor() {
    }

    /**
     * Sets the content of the code (as string) with its CodeLines
     */
    setTextWithLines(): void {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }


    /**
     * Add a comment at the end of a line of the code
     * @param comment   // The comment to add
     * @param line      // The CodeLine where to add the comment
     */
    addComment(comment: string, line: CodeLine): string {
        const txt = `${line?.text} // `;
        return `${txt.padEnd(this.maxLineLength + 10, '-')} ${comment}`;
    }


    setLinesNestingCpx(): void {
        for (const line of this.lines) {
            line.setNestingCpx();
        }
    }

}
