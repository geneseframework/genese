import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { ImportDeclaration } from '../models/import-declaration.model';
import { PackageOrTypeName } from '../models/package-or-type-name.model';
import { ImportChildren } from '../models/import-children.model';

/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
export class AstImportGenerationJavaService {

    /**
     * Gets the package Node
     * @param node // AST Node
     */
    generate(importDeclarationList: ImportDeclaration[], importAstNodes): AstNodeInterface[]{
        importDeclarationList.forEach(importDeclaration => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(importDeclaration);
            this.generateImportChildren(importDeclaration.children, importAstNodes);
            importAstNodes.children.push(astNode);
        });
        return importAstNodes;
    }

    /**
     * @param  {ImportChildren} importChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateImportChildren(importChildren: ImportChildren, astNode: AstNodeInterface): void {
        if(importChildren) {
            JavaService.getAstNodeInfos(importChildren.import, astNode);
            this.generatePackageOrTypeName(importChildren.packageOrTypeName[0], astNode);
            JavaService.getAstNodeInfos(importChildren.semicolon, astNode);
        }
    }

    /**
     * @param  {PackageOrTypeName} packageOrTypeName
     * @param  {} packageOrTypeNameAstNode
     */
    generatePackageOrTypeName(packageOrTypeName: PackageOrTypeName, packageOrTypeNameAstNode): AstNodeInterface {        
        let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(packageOrTypeName);
        JavaService.getAstNodeInfos(packageOrTypeName.children.identifier, astNode);
        packageOrTypeNameAstNode.children.push(astNode);

        return packageOrTypeNameAstNode;
    }
}