import { Utils } from "./Utils";
import { PackageDeclaration } from "./PackageDeclaration";
import { Infos } from "./Infos";
import { ImportDeclaration } from "./ImportDeclaration";
import { TypeDeclaration } from "./TypeDeclaration";

export class CompilationUnit {
    name?: string = '';
    children?: CompilationUnitChildren = Utils.initCompilationUnitChildren();
    location?: Location = Utils.initLocation();
}

export class CompilationUnitChildren {
    ordinaryCompilationUnit?: OrdinaryCompilationUnit[];
    EOF?: Infos[] = Utils.initInfo();
}

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

export class Location {
    startOffset?: number = 0;
    startLine?: number = 0;
    startColumn?: number = 0;
    endOffset?: number = 0;
    endLine?: number = 0;
    endColumn?: number = 0;
}