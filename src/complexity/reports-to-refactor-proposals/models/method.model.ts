import { Node } from 'ts-morph';
import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';

export class Method {
    astFile: AstFile = undefined;
    node: Node = undefined;
    refactoredMethod?: Method = undefined;

    constructor(node: Node, astFile: AstFile) {
        this.node = node;
        this.astFile = astFile;
    }
}
