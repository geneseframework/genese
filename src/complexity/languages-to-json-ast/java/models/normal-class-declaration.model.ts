import { NormalClassDeclarationChildren } from "./normal-class-declaration-children.model";
import { Location } from "./location.model";

export class NormalClassDeclaration{
    name? = '';
    children?: NormalClassDeclarationChildren = new NormalClassDeclarationChildren();
    location?: Location = new Location();
}
