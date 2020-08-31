import { Infos } from "./infos.model";
import { ClassBodyDeclaration } from "./class-body-declaration.model";

export class ClassBodyChildren {
    lCurly?: Infos[] = [new Infos()];
    classBodyDeclaration?: ClassBodyDeclaration[] = [new ClassBodyDeclaration()];
    rCurly?: Infos[] = [new Infos()];
}
