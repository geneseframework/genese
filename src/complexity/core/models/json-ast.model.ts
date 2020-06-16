import { AstFolder } from '../../ast-to-reports/models/ast/ast-folder.model';
import { Evaluate } from '../../ast-to-reports/interfaces/evaluate.interface';
import { PrivateLog } from '../../ast-to-reports/interfaces/private-log.interface';
import { CpxFactors } from '../../ast-to-reports/models/cpx-factor/cpx-factors.model';
import { Language } from '../enum/language.enum';

export class JsonAst implements Evaluate, PrivateLog {

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
        console.log('LOG JSON_AST');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log(this.astFolder);
    }

}
