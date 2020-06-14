import { AstFolder } from './ast-folder.model';
import { PrivateLog } from '../../interfaces/private-log.interface';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../../models/cpx-factor/cpx-factors.model';

export class JsonAst implements Evaluate, PrivateLog {

    #astFolder?: AstFolder = undefined;
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;



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
