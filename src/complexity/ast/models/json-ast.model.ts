import { AstFile } from './ast-file.model';

export class JsonAst {

    #astFiles?: AstFile[] = [];


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFiles(): AstFile[] {
        return this.#astFiles;
    }


    set astFiles(astFiles: AstFile[]) {
        this.#astFiles = astFiles ?? [];
    }

}
