import { Location } from "./location.model";
import { ClassBodyDeclarationChildren } from "./class-body-declaration-children.model";

export class ClassBodyDeclaration {
    classBodyDeclaration?: ClassBodyDeclaration[] = [new ClassBodyDeclaration()];
    name ?= '';
    children?: ClassBodyDeclarationChildren = new ClassBodyDeclarationChildren();
    location?: Location = new Location();
}
