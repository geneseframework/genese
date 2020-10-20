import { Location } from "./location.model";
import { StatementChildren } from "./statement-children.model";

export class Statement {
    statement?: Statement[] = [new Statement()];
    name ?= '';
    children?: StatementChildren = new StatementChildren();
    location?: Location = new Location();
}
