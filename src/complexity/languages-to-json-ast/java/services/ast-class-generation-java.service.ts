import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { Java } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';
import { ClassDeclaration } from '../models/class-declaration.model';
import { ClassModifier } from '../models/class-modifier.model';

/**
 * - Generate AstNode for class from their Abstract Syntax Tree (AST)
 */
export class AstClassGenerationJavaService {

    /**
     * Gets the classDeclaration Node List
     * @param  {ClassDeclaration[]} classDeclarationList
     * @param  {AstNodeInterface} classDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(classDeclarationList: ClassDeclaration[], classDeclarationAstNode: AstNodeInterface): AstNodeInterface{
        classDeclarationList.forEach(classDeclaration => {         
            let astNode = Java.getAstNodeWithChildren(classDeclaration);
            astNode.kind = SyntaxKind.classDeclaration;

            if(classDeclaration.children?.classModifier){
                this.getClassModifierList(classDeclaration.children.classModifier, astNode);
            }
            if(classDeclaration.children?.normalClassDeclaration){
                this.getNormalClassDeclaration(classDeclaration.children.normalClassDeclaration, astNode);
            }

            classDeclarationAstNode.children.push(astNode);
        });

        return classDeclarationAstNode;
    }

    /**
     * Gets the classModifier Node List
     * @param  {ClassModifier[]} classModifier
     * @param  {} classModifierAstNode
     * @returns AstNodeInterface
     */
    getClassModifierList(classModifier: ClassModifier[], classModifierAstNode): AstNodeInterface[]{
        classModifier.forEach(child => {
            let astNode = Java.getAstNodeWithChildren(child);
            astNode.kind = SyntaxKind.classModifier;

            if(child.children?.annotation) {
                Java.getAnnotation(child.children.annotation, astNode);
            }

            else if (child.children?.Public) {
                astNode.children.push(Java.getAstNode(child.children.Public));
            }
            classModifierAstNode.children.push(astNode);
        });
        return classModifierAstNode;
    }

    /**
     * Gets the normalClass Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    getNormalClassDeclaration(normalClass, normalClassAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(normalClass[0]);
        astNode.kind = SyntaxKind.normalClassDeclaration;
        
        if(normalClass[0].children.Class){
            this.getNormalClass(normalClass[0].children.Class,astNode);
        }
        if(normalClass[0].children.typeIdentifier){
            this.getTypeIdentifier(normalClass[0].children.typeIdentifier,astNode)
        }
        if(normalClass[0].children.classBody){
            this.getClassBody(normalClass[0].children.classBody,astNode);
        }
        
        normalClassAstNode.children.push(astNode);

        return normalClassAstNode;
    }

    /**
     * Gets the Class Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    getNormalClass(normalClass, normalClassAstNode): AstNodeInterface{
        let astNode = Java.getAstNode(normalClass[0]);
        astNode.kind = SyntaxKind.Class;
        normalClassAstNode.children.push(astNode);
        
        return normalClassAstNode;
    }

    /**
     * Gets the typeIdentifier Node
     * @param typeIdentifier // AST Node
     */
    getTypeIdentifier(typeIdentifier, typeIdentifierAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(typeIdentifier[0]);
        astNode.kind = SyntaxKind.typeIdentifier;

        if(typeIdentifier[0].children.Identifier) {
            Java.getIdentifier(typeIdentifier[0].children.Identifier, astNode);
        }

        typeIdentifierAstNode.children.push(astNode);

        return typeIdentifierAstNode;
    }

        /**
     * Gets the classBody Node
     * @param classBody // AST Node
     */
    getClassBody(classBody, classBodyAstNode): AstNodeInterface{     
        let astNode = Java.getAstNodeWithChildren(classBody[0]);
        astNode.kind = SyntaxKind.classBody;

        Java.getLCurly(classBody[0].children.LCurly,astNode);

        if(classBody[0].children.classBodyDeclaration){
            this.getClassBodyDeclaration(classBody[0].children.classBodyDeclaration,astNode);
        }
        
        Java.getRCurly(classBody[0].children.RCurly,astNode);
        
        classBodyAstNode.children.push(astNode);

        return astNode;
    }

    /**
     * Gets the classBodyDeclaration Node List
     * @param classBodyDeclaration // AST Node
     */
    getClassBodyDeclaration(classBodyDeclaration, classBodyDeclarationAstNode): AstNodeInterface[]{

        classBodyDeclaration.forEach(child =>{           
            let astNode = Java.getAstNodeWithChildren(child);
            astNode.kind = SyntaxKind.classBodyDeclaration;

            if(child.children.classMemberDeclaration){
                this.getClassMemberDeclaration(child.children.classMemberDeclaration, astNode);
            }

            classBodyDeclarationAstNode.children.push(astNode);
        })

        return classBodyDeclarationAstNode;
    }
    
    /**
     * Gets the classMemberDeclaration Node
     * @param classMemberDeclaration // AST Node
     */
    getClassMemberDeclaration(classMemberDeclaration, classMemberDeclarationAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(classMemberDeclaration[0]);
        astNode.kind = SyntaxKind.classMemberDeclaration;
        
        if(classMemberDeclaration[0].children.methodDeclaration){
            new AstFunctionageGenerationJavaService().generate(classMemberDeclaration[0].children.methodDeclaration, astNode);
        }

        classMemberDeclarationAstNode.children.push(astNode);

        return classMemberDeclarationAstNode;
    }    

}