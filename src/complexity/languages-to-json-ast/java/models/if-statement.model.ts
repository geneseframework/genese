import { Location } from "./location.model";
import { Infos } from "./infos.model";
import { Expression } from "./expression.model";
import { OtherStatement } from "./other-statement.model";

export class IfStatement {
    name ?= '';
    children?: {
        If?: Infos[],
        LBrace?: Infos[],
        expression?: Expression[],
        RBrace?: Infos[],
        statement?: OtherStatement[]
    } = {
        If: [new Infos()],
        LBrace: [new Infos()],
        expression: [new Expression()],
        RBrace: [new Infos()],
        statement: [new OtherStatement()]
    }
    location?: Location = new Location();
}
