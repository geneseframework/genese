import { Location } from "./location.model";
import { ImportChildren } from "./import-children.model";

export class ImportDeclaration {
    importDeclaration?: ImportDeclaration[] = [new ImportDeclaration()];
    name ?= '';
    children?: ImportChildren = new ImportChildren();
    location?: Location = new Location();
}
