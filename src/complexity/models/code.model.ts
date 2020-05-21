import { CodeLine } from './code-line.model';

export class Code {

    lines?: CodeLine[] = [];

    constructor() {
    }

    get text(): string {
        return this.lines.toString();
    }
}
