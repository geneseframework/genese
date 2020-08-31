import { FormalParameterChildren } from "./formal-parameter-children.model";
import { Location } from "./location.model";

export class FormalParameter {
    formalParameter?: FormalParameter[] = [new FormalParameter()];
    name ?= '';
    children?: FormalParameterChildren = new FormalParameterChildren();
    location?: Location = new Location();
}
