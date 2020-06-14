import { AstFolder } from './ast-folder.model';
import { PrivateLog } from '../../interfaces/private-log.interface';

export class JsonAst implements PrivateLog {

    #astFolder?: AstFolder;


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFolder(): AstFolder {
        return this.#astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this.#astFolder = astFolder;
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    log(): void {
        console.log('LOG JSON_AST');
        console.log(this.astFolder);
    }

}
