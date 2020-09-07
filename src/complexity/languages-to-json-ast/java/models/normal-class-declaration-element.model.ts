import { NormalClassDeclarationChildren } from "./normal-class-declaration-children.model";
import { Location } from "./location.model";

export class NormalClassDeclarationElement {
    name ?= '';
    children?: NormalClassDeclarationChildren = new NormalClassDeclarationChildren();
    location?: Location = new Location();
}
