import { Logg } from '../../../core/interfaces/logg.interface';
import { TsFolder } from './ts-folder.model';

export class TsJsonAst implements Logg {

    #tsFolder?: TsFolder = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get tsFolder(): TsFolder {
        return this.#tsFolder;
    }


    set tsFolder(tsFolder: TsFolder) {
        this.#tsFolder = tsFolder;
    }


    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log('LOG JSON_AST');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log(this.tsFolder);
    }

}
