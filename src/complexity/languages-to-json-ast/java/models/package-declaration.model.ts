import { Location } from "./location.model";
import { PackageDeclarationChildren } from "./package-declaration-children.model";

export class PackageDeclaration {
    packageDeclaration?: PackageDeclaration[] = [new PackageDeclaration()];
    name ?= '';
    children?: PackageDeclarationChildren = new PackageDeclarationChildren();
    location?: Location = new Location();
}
