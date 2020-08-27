import { Utils } from "./Utils";
import { Infos } from "./Infos";

export class TypeDeclaration{
    typeDeclaration?: TypeDeclaration[];
    name?: string = '';
    children?: ClassDeclaration = new ClassDeclaration();
    location?: Location = Utils.initLocation();
}

export class TypeDeclarationChildren{
    classDeclaration?: ClassDeclaration[];
}

export class ClassDeclaration{
    classDeclaration?: ClassDeclaration[];
    name?: string = '';
    children?: ClassDeclarationChildren = Utils.initClassDeclarationChildren();
    location?: Location = Utils.initLocation();    
}

export class ClassDeclarationChildren{
    classModifier?: ClassModifier[] = Utils.initClassModifier();
    normalClassDeclaration?: NormalClassDeclaration[] = Utils.initNormalClassDeclaration();
}

export class ClassModifier{
    classModifier?: ClassModifier[];
    name?: string = '';
    children?: ClassModifierChildren;
    location?: Location = Utils.initLocation();
}

export class ClassModifierChildren {
    annotation?: Annotation[];
    Public?: Infos[];
}

export class Annotation{
    annotation?: Annotation[];
    name?: string = '';
    children?: AnnotationChildren[];
    location?: Location = Utils.initLocation();
}

export class AnnotationChildren{
    at?: Infos[] = Utils.initInfo();
    typeName?: Infos[] = Utils.initInfo();
}

export class NormalClassDeclaration{
    name?: string = '';
    children?: NormalClassDeclarationChildren;
    location?: Location = Utils.initLocation();
}

export class NormalClassDeclarationChildren{
    Class?: Infos[] = Utils.initInfo();
    typeIdentifier?: Infos[] = Utils.initInfo();
    classBody?: Infos[] = Utils.initInfo();
}