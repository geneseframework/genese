import { AstFile } from './ast-file.model';
import { AstFolder } from './ast-folder.model';

export class JsonAst {


    // ---------------------------------------------------------------------------------
    //                                Mandatory property
    // ---------------------------------------------------------------------------------


    #astFilesFromJson?: AstFile[] = [];


    // ---------------------------------------------------------------------------------
    //                                Other properties
    // ---------------------------------------------------------------------------------


    #astFolders?: AstFolder[] = [];


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFiles(): AstFile[] {
        return this.#astFilesFromJson;
    }


    set astFiles(astFiles: AstFile[]) {
        this.#astFilesFromJson = astFiles ?? [];
    }


    get astFolders(): AstFolder[] {
        return this.#astFolders;
    }


    set astFolders(astFolders: AstFolder[]) {
        this.#astFolders = astFolders ?? [];
    }

}
