import { Infos } from "./infos.model";
import { TypeIdentifier } from "./type-identifier.model";
import { ClassBody } from "./class-body.model";

export class NormalClassDeclarationChildren {
    Class?: Infos[] = [new Infos()];
    typeIdentifier?: TypeIdentifier[] = [new TypeIdentifier()];
    classBody?: ClassBody[] = [new ClassBody()];
}
