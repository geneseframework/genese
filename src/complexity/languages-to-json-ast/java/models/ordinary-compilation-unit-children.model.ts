import { PackageDeclaration } from "./package-declaration.model";
import { ImportDeclaration } from "./import-declaration.model";
import { TypeDeclaration } from "./type.declaration-model";

export class OrdinaryCompilationUnitChildren{
    packageDeclaration?: PackageDeclaration[] = [new PackageDeclaration()];
    importDeclaration?: ImportDeclaration[] = [new ImportDeclaration()];
    typeDeclaration?: TypeDeclaration[] = [new TypeDeclaration()];
}
