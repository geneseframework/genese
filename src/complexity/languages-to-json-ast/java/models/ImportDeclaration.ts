import { Utils } from "./Utils";
import { Infos } from "./Infos";

export class ImportDeclaration{
    importDeclaration?: ImportDeclaration[];
    name?: string = '';
    children?: ImportChildren = Utils.initImportChildren();
    location?: Location = Utils.initLocation();
}

export class ImportChildren {
    Import?: Infos[] = Utils.initInfo();
    packageOrTypeName?: PackageOrTypeName[] = Utils.initPackageOrTypeName();
    Semicolon?: Infos[] = Utils.initInfo();
}

export class PackageOrTypeName {
    name?: string = '';
    children?: PackageOrTypeNameChildren = Utils.initPackageOrTypeNameChildren();
    location?: Location = Utils.initLocation();
}

export class PackageOrTypeNameChildren {
    Identifier?: Infos[];
    Dot?: Infos[];
}