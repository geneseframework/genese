import { Location } from "./location.model";
import { IfStatementChildren } from "./if-statement-children.model";
import { DoStatementChildren } from './do-statement-children.model';

export class DoStatement {
    name ?= '';
    children?: DoStatementChildren  = new DoStatementChildren();
    location?: Location = new Location();
}
