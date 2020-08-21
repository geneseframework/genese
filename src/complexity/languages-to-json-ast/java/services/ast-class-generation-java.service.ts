import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { Java } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';

/**
 * - Generate AstNode for class from their Abstract Syntax Tree (AST)
 */
export class AstClassGenerationJavaService {

    /**
     * Gets the classDeclaration Node List
     * @param node // AST Node
     */
    generate(classDeclaration, classDeclarationAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(classDeclaration[0]);
        astNode.kind = SyntaxKind.classDeclaration;

        //classModifier
        this.getClassModifierList(classDeclaration[0].children.classModifier, astNode);
            
        //normalClassDeclaration
        if(classDeclaration[0].children.normalClassDeclaration){
            this.getNormalClassDeclaration(classDeclaration[0].children.normalClassDeclaration, astNode);
        }

        classDeclarationAstNode.children.push(astNode);

        return classDeclarationAstNode;
    }


    /**
     * Gets the classModifier Node List
     * @param node // AST Node
     */
    getClassModifierList(node, classModifierAstNode): AstNodeInterface[]{
        node.forEach(child => {
            let astNode = Java.getAstNodeWithChildren(child);
            astNode.kind = SyntaxKind.classModifier;

            //annotation
            if(child.children.annotation) {
                Java.getAnnotation(child.children.annotation, astNode);
            } 
            //Public
            else if (child.children.Public) {
                astNode.children.push(Java.getAstNode(child.children.Public));
            }
            classModifierAstNode.children.push(astNode);
        });
        return classModifierAstNode;
    }

    /**
     * Gets the normalClass Node
     * @param normalClass // AST Node
     */
    getNormalClassDeclaration(normalClass, normalClassAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(normalClass[0]);
        astNode.kind = SyntaxKind.normalClassDeclaration;
        
        //Class
        if(normalClass[0].children.Class){
            this.getNormalClass(normalClass[0].children.Class,astNode);
        }
        //typeIdentifier
        if(normalClass[0].children.typeIdentifier){
            this.getTypeIdentifier(normalClass[0].children.typeIdentifier,astNode)
        }
        //classBody
        if(normalClass[0].children.classBody){
            this.getClassBody(normalClass[0].children.classBody,astNode);
        }
        
        normalClassAstNode.children.push(astNode);

        return normalClassAstNode;
    }

    /**
     * Gets the Class Node
     * @param normalClass // AST Node
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

        //Identifier
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

        //LCurly
        Java.getLCurly(classBody[0].children.LCurly,astNode);

        //classBodyDeclaration
        if(classBody[0].children.classBodyDeclaration){
            this.getClassBodyDeclaration(classBody[0].children.classBodyDeclaration,astNode);
        }
        
        //RCurly
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

            //classMemberDeclaration
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
        
        //methodDeclaration
        if(classMemberDeclaration[0].children.methodDeclaration){
            new AstFunctionageGenerationJavaService().generate(classMemberDeclaration[0].children.methodDeclaration, astNode);
        }

        classMemberDeclarationAstNode.children.push(astNode);

        return classMemberDeclarationAstNode;
    }    

}