import { Infos } from "./infos.model";
import { OrdinaryCompilationUnit } from "./ordinary-compilation-unit.model";

export class CompilationUnitChildren {
    ordinaryCompilationUnit?: OrdinaryCompilationUnit[] = [new OrdinaryCompilationUnit()];
    EOF?: Infos[] = [new Infos()];
}
