import { AstFile } from './ast-file.model';

export class JsonAst {

    #sourceFile?: AstFile = undefined;


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get sourceFile(): AstFile {
        return this.#sourceFile;
    }


    set sourceFile(astFile: AstFile) {
        this.sourceFile = astFile;
    }

}
