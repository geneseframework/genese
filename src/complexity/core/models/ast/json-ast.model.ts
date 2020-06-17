import { AstFolder } from './ast-folder.model';
import { Evaluate } from '../../../ast-to-reports/interfaces/evaluate.interface';
import { Logg } from '../../interfaces/logg.interface';
import { CpxFactors } from '../../../ast-to-reports/models/cpx-factor/cpx-factors.model';
import { Language } from '../../enum/language.enum';
import * as chalk from 'chalk';

export class JsonAst implements Evaluate, Logg {

    #astFolder?: AstFolder = undefined;
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    // #language?: Language = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFolder(): AstFolder {
        return this.#astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this.#astFolder = astFolder;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    // get language(): Language {
    //     return this.#language;
    // }
    //
    //
    // set language(language: Language) {
    //     this.#language = language;
    // }


    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------


    evaluate(): void {
        this.cpxFactors = this.#astFolder.cpxFactors;
        this.#cyclomaticCpx = this.#astFolder.cyclomaticCpx;
    }


    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'JSON_AST'));
        console.log('-----------------------------');
        console.log(chalk.blueBright('astFolder :'), this.astFolder?.path);
    }

}
