import { CodeLine } from './code-line.model';

export class Code {

    lines?: CodeLine[] = [];
    maxLineWidth = 0;

    constructor() {
    }

    get text(): string {
        return this.lines.toString();
    }
}
