import { Infos } from "./infos.model";
import { FormalParameterList } from "./formal-parameter-list.model";

export class MethodDeclaratorChildren {
    identifier?: Infos[] = [new Infos()];
    lBrace?: Infos[] = [new Infos()];
    formalParameterList?: FormalParameterList[] = [new FormalParameterList()];
    rBrace?: Infos[] = [new Infos()];
}
