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


    addComment(comment: string, line: CodeLine): CodeLine {
        const updatedLine =new CodeLine();
        updatedLine.position = line?.position;
        updatedLine.text = line?.text;
        const txt = `${updatedLine.text} // `;
        updatedLine.text = `${txt.padEnd(this.maxLineWidth + 10, '-')} ${comment}`;
        return updatedLine;
    }
}
