import { CodeLine } from './code-line.model';

export class Code {

    lines?: CodeLine[] = [];
    maxLineWidth = 0;
    text = '';

    constructor() {
    }

    setTextWithLines(): void {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }


    addComment(comment: string, line: CodeLine): string {
        const txt = `${line?.text} // `;
        return `${txt.padEnd(this.maxLineWidth + 10, '-')} ${comment}`;
    }
}
