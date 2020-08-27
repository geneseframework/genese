import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Java } from './java.service';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { GeneseMapperService } from './genese-mapper.service';
import { ImportDeclaration, PackageOrTypeName } from '../models/ImportDeclaration';

/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
export class AstImportGenerationJavaService {

    /**
     * Gets the package Node
     * @param node // AST Node
     */
    generate(importDeclaration: ImportDeclaration[], importAstNodes): AstNodeInterface[]{
        importDeclaration.forEach(child => {
            let astNode = Java.getAstNodeWithChildren(child);
            astNode.kind = SyntaxKind.importDeclaration

            //ImportDeclaration mapping
            const importObject: ImportDeclaration = GeneseMapperService.getMappedImport(child);
            if(importObject?.name === SyntaxKind.importDeclaration && importObject.children){
                //Import
                if(child.children.Import){
                    Java.getImport(child.children.Import, astNode);
                }

                //packageOrTypeName
                if(child.children.packageOrTypeName){
                    this.getPackageOrTypeName(child.children.packageOrTypeName[0], astNode);
                }

                //Semicolon
                if(child.children.Semicolon){
                    Java.getSemicolon(child.children.Semicolon, astNode);
                }

                importAstNodes.children.push(astNode);
            }
        });

        return importAstNodes;
    }

    /**
     * 
     * @param packageOrTypeName 
     * @param packageOrTypeNameAstNode 
     */
    getPackageOrTypeName(packageOrTypeName, packageOrTypeNameAstNode): AstNodeInterface {        
        let astNode = Java.getAstNodeWithChildren(packageOrTypeName);
        astNode.kind = SyntaxKind.packageOrTypeName;

        //mapper packageOrTypeName
        const packageOrTypeNameObject: PackageOrTypeName = GeneseMapperService.getMappedPackageOrTypeName(packageOrTypeName);

        if(packageOrTypeNameObject?.name === SyntaxKind.packageOrTypeName && packageOrTypeNameObject.children){

            //identifiers
            if(packageOrTypeName.children.Identifier){
                Java.getIdentifier(packageOrTypeName.children.Identifier, astNode);
            }
        }

        packageOrTypeNameAstNode.children.push(astNode);

        return packageOrTypeNameAstNode;
    }
}