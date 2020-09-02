import { Infos } from "./infos.model";

export class PackageDeclarationChildren {
    Dot?: Infos[] = [new Infos()];
    Identifier?: Infos[] = [new Infos()];
    Package?: Infos[] = [new Infos()];
    Semicolon?: Infos[] = [new Infos()];
}
