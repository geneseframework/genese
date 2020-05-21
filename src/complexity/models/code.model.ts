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


    getLineIssue(position: number): number {
        if (position < 0 || position > this.text.length) {
            return 0;
        } else {
            const issue = this.lines.findIndex(e => {
                return position >= e.position && position < e.position + e.text.length
            }) ;
            return issue;
        }
    }
}
