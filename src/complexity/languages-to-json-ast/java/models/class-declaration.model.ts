import { ClassDeclarationChildren } from "./class-declaration-children.model";
import { Location } from "./location.model";

export class ClassDeclaration {
    classDeclaration?: ClassDeclaration[];
    name ?= '';
    children?: ClassDeclarationChildren = new ClassDeclarationChildren();
    location?: Location = new Location();   
}
