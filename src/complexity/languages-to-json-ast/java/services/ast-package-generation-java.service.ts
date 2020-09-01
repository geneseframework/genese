import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { JavaService } from './java.service';
import { PackageDeclarationElement } from '../models/package-declaration-element.model';
import { PackageDeclarationChildren } from '../models/package-declaration-children.model';

/**
 * - Generate AstNode for package from their Abstract Syntax Tree (AST)
 */
export class AstPackageGenerationJavaService {

    /**
     * Gets the package Node
     * @param  {PackageDeclarationElement} packageDeclaration
     * @param  {AstNodeInterface} packageAstNode
     * @returns AstNodeInterface
     */
    generate(_packageDeclarationElement: PackageDeclarationElement, packageAstNode?: AstNodeInterface): AstNodeInterface {
        return packageAstNode;
    }
}