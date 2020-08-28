import { Infos } from "./infos.model";
import { ClassBodyDeclaration } from "./class-body-declaration.model";

export class ClassBodyChildren {
    LCurly?: Infos[] = [new Infos()];
    classBodyDeclaration?: ClassBodyDeclaration[] = [new ClassBodyDeclaration()];
    RCurly?: Infos[] = [new Infos()];
}
