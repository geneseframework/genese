import { Infos } from "./infos.model";
import { Statement } from "./statement.model";
import { Expression } from "./expression-model";

export class IfStatementChildren {
    if?: Infos[] = [new Infos()];
    lBrace?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];;
    rBrace?: Infos[] = [new Infos()];
    statement?: Statement[] = [new Statement()];
}
