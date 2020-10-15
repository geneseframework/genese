import { Node } from 'ts-morph';
import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';

export class Method {
    refactoredMethod?: Method;

    constructor(public node?: Node, public astFile?: AstFile) {}
}
