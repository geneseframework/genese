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
        importDeclaration.forEach(importObject => {
            let astNode = Java.getAstNodeWithChildren(importObject);
            astNode.kind = SyntaxKind.importDeclaration

            if(importObject?.name === SyntaxKind.importDeclaration && importObject.children){
                //Import
                if(importObject.children.Import){
                    Java.getImport(importObject.children.Import, astNode);
                }

                //packageOrTypeName
                if(importObject.children.packageOrTypeName){
                    this.getPackageOrTypeName(importObject.children.packageOrTypeName[0], astNode);
                }

                //Semicolon
                if(importObject.children.Semicolon){
                    Java.getSemicolon(importObject.children.Semicolon, astNode);
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
    getPackageOrTypeName(packageOrTypeName: PackageOrTypeName, packageOrTypeNameAstNode): AstNodeInterface {        
        let astNode = Java.getAstNodeWithChildren(packageOrTypeName);
        astNode.kind = SyntaxKind.packageOrTypeName;

        if(packageOrTypeName?.name === SyntaxKind.packageOrTypeName && packageOrTypeName.children){
            //identifiers
            if(packageOrTypeName.children.Identifier){
                Java.getIdentifier(packageOrTypeName.children.Identifier, astNode);
            }
        }

        packageOrTypeNameAstNode.children.push(astNode);

        return packageOrTypeNameAstNode;
    }
}