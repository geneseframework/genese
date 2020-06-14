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
    //                                Other methods
    // ---------------------------------------------------------------------------------


    log(message?: string): void {
        console.log('-----------------------------');
        console.log('LOG JSON_AST');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log(this.astFolder);
    }

}
