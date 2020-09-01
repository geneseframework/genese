import { Location } from "./location.model";
import { Infos } from "./infos.model";
import { Expression } from "./expression-model";
import { OtherStatement } from "./other-statement.model";

export class IfStatement {
    name ?= '';
    children?: {
        if?: Infos[],
        lBrace?: Infos[],
        expression?: Expression[],
        rBrace?: Infos[],
        statement?: OtherStatement[]
    } = {
        if: [new Infos()],
        lBrace: [new Infos()],
        expression: [new Expression()],
        rBrace: [new Infos()],
        statement: [new OtherStatement()]
    }
    location?: Location = new Location();
}
