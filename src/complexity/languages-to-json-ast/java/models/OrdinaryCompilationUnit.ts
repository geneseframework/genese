import { PackageDeclaration } from "./PackageDeclaration";
import { ImportDeclaration } from "./ImportDeclaration";
import { TypeDeclaration } from "./TypeDeclaration";
import { Utils } from "./Utils";

export class OrdinaryCompilationUnit{
    ordinaryCompilationUnit?: OrdinaryCompilationUnit[];
    name?: string = '';
    children?: OrdinaryCompilationUnitChildren = Utils.initOrdinaryCompilationUnitChildren();
    location?: Location = Utils.initLocation();
}

export class OrdinaryCompilationUnitChildren{
    packageDeclaration?: PackageDeclaration[];
    importDeclaration?: ImportDeclaration[];
    typeDeclaration?: TypeDeclaration[];
}