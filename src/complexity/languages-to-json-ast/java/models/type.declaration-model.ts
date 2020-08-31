import { Location } from "./location.model";
import { TypeDeclarationChildren } from "./type-declaration-children.model";

export class TypeDeclaration {
    typeDeclaration?: TypeDeclaration[] = [new TypeDeclaration()];
    name ?= '';
    children?: TypeDeclarationChildren = new TypeDeclarationChildren();
    location?: Location = new Location();
}
