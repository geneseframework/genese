import { Code } from '../models/code.model';

export class CodeService {

    #code: Code;
    #text = '';

    constructor(text = '') {
        this.#text = text;
        this.#code = this.createCode(text)
    }

    get text(): string {
        return this.#text
    }

    get lines(): string[] {
        const linesArray: string[] = [];
        return linesArray;
    }


    createCode(text: string): Code {
        const code: Code = new Code();
        const textLines: string[] = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            code.lines.push({text: textLine, issue: issue});
            code.maxLineWidth = code.maxLineWidth < textLine.length ? textLine.length : code.maxLineWidth;
            issue++;
        }
        // console.log('CODE', code);
        return code;
    }
}
