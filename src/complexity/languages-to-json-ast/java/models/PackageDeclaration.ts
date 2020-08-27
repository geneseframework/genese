import { Utils } from "./Utils";
import { Infos } from "./Infos";

export class PackageDeclaration{
    packageDeclaration?: PackageDeclaration[];
    name?: string = '';
    children?: PackageDeclarationChildren = Utils.initPackageDeclarationChildren();
    location?: Location = Utils.initLocation();
}

export class PackageDeclarationChildren {
    Package?: Infos[] = Utils.initInfo();
    Identifier?: Infos[] = Utils.initInfo();
    Dot?: Infos[] = Utils.initInfo();
    Semicolon?: Infos[] = Utils.initInfo();
}