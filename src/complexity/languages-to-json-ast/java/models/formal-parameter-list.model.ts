import { Location } from "./location.model";
import { FormalParameterListChildren } from "./formal-parameter-list-children.model";

export class FormalParameterList {
    formalParameterList?: FormalParameterList[] = [new FormalParameterList()];
    name ?= '';
    children?: FormalParameterListChildren = new FormalParameterListChildren();
    location?: Location = new Location();
}
