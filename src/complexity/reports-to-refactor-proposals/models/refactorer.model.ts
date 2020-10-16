import { SourceFile } from 'ts-morph';

import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';
import { System } from './system.model';

export abstract class Refactorer {
    oldSystems: System[];
    systems: System[] = [];
    abstract prepareSystems(sourceFile: SourceFile, astFile: AstFile): Refactorer;
    abstract analyze(): void;
}
