import { ClassModifier } from "./class-modifier.model";
import { NormalClassDeclaration } from "./normal-class-declaration.model";

export class ClassDeclarationChildren {
    classModifier?: ClassModifier[] = [new ClassModifier()]
    normalClassDeclaration?: NormalClassDeclaration[] = [new NormalClassDeclaration()];
}
