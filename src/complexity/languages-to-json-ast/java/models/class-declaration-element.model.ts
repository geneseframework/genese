import { ClassDeclarationChildren } from "./class-declaration-children.model";
import { Location } from "./location.model";

export class ClassDeclarationElement {
    name ?= '';
    children?: ClassDeclarationChildren = new ClassDeclarationChildren();
    location?: Location = new Location();   
}
