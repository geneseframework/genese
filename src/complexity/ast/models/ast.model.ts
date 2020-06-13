import { AstFile } from './ast-file.model';

export class JsonAst {

    #astFile?: AstFile = new AstFile();


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFile(): AstFile {
        return this.#astFile;
    }


    set astFile(astFile: AstFile) {
        console.log(astFile)
        this.#astFile = astFile;
    }

}
