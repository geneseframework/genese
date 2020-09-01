import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { PackageOrTypeName } from '../models/package-or-type-name.model';
import { ImportChildren } from '../models/import-children.model';
import { ImportDeclarationElement } from '../models/import-declaration-element.model';

/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
export class AstImportGenerationJavaService {
    
    /**
     * Gets the import Node
     * @param  {ImportDeclarationElement[]} importDeclarations
     * @param  {AstNodeInterface} importAstNodes
     * @returns AstNodeInterface
     */
    generate(_importDeclaration: ImportDeclarationElement[], importAstNodes: AstNodeInterface): AstNodeInterface {
        return importAstNodes;
    }
}