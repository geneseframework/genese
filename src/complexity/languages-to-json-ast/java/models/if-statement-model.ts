import { Location } from "./location.model";
import { Infos } from "./infos.model";
import { Expression } from "./expression-model";
import { Statement } from "./statement.model";

export class IfStatement {
    name ?= '';
    children: {
        if?: Infos[],
        lBrace?: Infos[],
        expression?: Expression[],
        rBrace?: Infos[],
        statement?: Statement[],
    }
    location?: Location = new Location();
}
