import { Location } from "./location.model";
import { MethodDeclarationChildren } from "./method-declaration-children.model";

export class MethodDeclaration {
    methodDeclaration?: MethodDeclaration[] = [new MethodDeclaration()];
    name ?= '';
    children?: MethodDeclarationChildren = new MethodDeclarationChildren();
    location?: Location = new Location();
}
