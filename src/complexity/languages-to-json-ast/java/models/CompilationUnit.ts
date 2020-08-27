import { Utils } from "./Utils";
import { Infos } from "./Infos";
import { OrdinaryCompilationUnit } from "./OrdinaryCompilationUnit";

export class CompilationUnit {
    name?: string = '';
    children?: CompilationUnitChildren = Utils.initCompilationUnitChildren();
    location?: Location = Utils.initLocation();
}

export class CompilationUnitChildren {
    ordinaryCompilationUnit?: OrdinaryCompilationUnit[];
    EOF?: Infos[] = Utils.initInfo();
}