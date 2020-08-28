import { FormalParameterChildren } from "./formal-parameter-children.model";

export class FormalParameter {
    formalParameter?: FormalParameter[];
    name ?= '';
    children?: FormalParameterChildren = new FormalParameterChildren();
    location?: Location = new Location();
}
