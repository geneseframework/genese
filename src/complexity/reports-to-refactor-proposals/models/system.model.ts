import { Node } from 'ts-morph';
import { AstFile } from '../../json-ast-to-reports/models/ast/ast-file.model';

export class System {
    astFile: AstFile = undefined;
    node: Node = undefined;
    refactoredSystem?: System;
    isRefactored: boolean = false;

    constructor(node: Node, astFile: AstFile) {
        this.node = node;
        this.astFile = astFile;
    }
}
