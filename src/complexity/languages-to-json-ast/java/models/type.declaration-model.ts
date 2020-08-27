import { Location } from "./location.model";
import { ClassDeclaration } from "./class-declaration.model";

export class TypeDeclaration{
    typeDeclaration?: TypeDeclaration[];
    name? = '';
    children?: ClassDeclaration = new ClassDeclaration();
    location?: Location = new Location();
}
