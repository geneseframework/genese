import { Code } from '../models/code.model';

export class CodeService {

    #code: Code;
    #text = '';

    constructor(text = '') {
        this.#text = text;
        this.#code = CodeService.createCode(text)
    }

    get text(): string {
        return this.#text
    }

    get lines(): string[] {
        const linesArray: string[] = [];
        return linesArray;
    }


    static createCode(text: string): Code {
        return new Code();
    }
}
