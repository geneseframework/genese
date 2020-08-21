import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { Java } from './java.service';

/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
export class AstFunctionageGenerationJavaService {
    

    /**
     * Gets the methodDeclaration Node
     * @param methodDeclaration // AST Node
     */
    generate(methodDeclaration, methodDeclarationAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(methodDeclaration[0]);
        astNode.kind = SyntaxKind.methodDeclaration;

        //methodModifier
        if(methodDeclaration[0].children.methodModifier){
            this.getMethodModifier(methodDeclaration[0].children.methodModifier, astNode);
        }
        //methodHeader
        if(methodDeclaration[0].children.methodHeader){
            this.getMethodHeader(methodDeclaration[0].children.methodHeader, astNode);
        }
        //methodBody
        if(methodDeclaration[0].children.methodBody){
            this.getMethodBody(methodDeclaration[0].children.methodBody, astNode);
        }
        
        methodDeclarationAstNode.children.push(astNode);

        return methodDeclarationAstNode;
    }

    /**
     * Gets the methodModifier Node List
     * @param methodModifier // AST Node
     */
    getMethodModifier(methodModifier, methodModifierAstNode): AstNodeInterface[]{

        //mapper
        methodModifier.forEach(child => {
            methodModifierAstNode.children.push(Java.getModificatorAstNode(child));
        });

        return methodModifierAstNode;
    }

    /**
     * Gets the methodHeader Node
     * @param methodHeader // AST Node
     */
    getMethodHeader(methodHeader, methodHeaderAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(methodHeader[0]);
        astNode.kind = SyntaxKind.methodHeader;

        let headerChildren = methodHeader[0].children;

        //result
        if(headerChildren.result) {
            this.getResult(headerChildren.result, astNode);
        }
        //methodDeclarator
        if(headerChildren.methodDeclarator){
            this.getMethodDeclarator(headerChildren.methodDeclarator, astNode);
        }

        methodHeaderAstNode.children.push(astNode);

        return methodHeaderAstNode;
    }

    /**
     * Gets the methodBody Node
     * @param methodBody // AST Node
     */
    getMethodBody(methodBody, methodBodyAstNode): AstNodeInterface{
        let astNode = Java.getAstNode(methodBody[0]);
        astNode.kind = SyntaxKind.methodDeclaration;

        methodBodyAstNode.children.push(astNode);

        return methodBodyAstNode;
    }

    /**
     * 
     * @param result // AST Node
     */
    getResult(result, resultAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(result[0]);
        astNode.kind = SyntaxKind.Result;

        //Void
        if(result[0].children.Void){
            astNode.children.push(Java.getAstNode(result[0].children.Void));
        }

        resultAstNode.children.push(astNode);

        return resultAstNode; 
    }

    /**
     * 
     * @param methodDeclarator // AST Node
     */
    getMethodDeclarator(methodDeclarator, methodDeclaratorAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(methodDeclarator[0]);
        astNode.kind = SyntaxKind.methodDeclarator;

        //Identifier
        if(methodDeclarator[0].children.Identifier){
            Java.getIdentifier(methodDeclarator[0].children.Identifier, astNode);
        }
        //LBrace
        if(methodDeclarator[0].children.LBrace){
            Java.getLBrace(methodDeclarator[0].children.LBrace, astNode);
        }
        //formalParameterList
        if(methodDeclarator[0].children.formalParameterList){
            this.getFormalParameterList(methodDeclarator[0].children.formalParameterList, astNode);
        }
        //RBrace
        if(methodDeclarator[0].children.RBrace){
            Java.getRBrace(methodDeclarator[0].children.RBrace, astNode);
        }

        methodDeclaratorAstNode.children.push(astNode);

        return methodDeclaratorAstNode;
    }

    /**
     * 
     * @param formalParameterList 
     */
    getFormalParameterList(formalParameterList, formalParameterAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(formalParameterList[0]);
        astNode.kind = SyntaxKind.formalParameterList;

        //formalParameter
        if(formalParameterList[0].children.formalParameter){
            this.getFormalParameter(formalParameterList[0].children.formalParameter);
        }

        formalParameterAstNode.children.push(astNode);

        return formalParameterAstNode;
    }

    /**
     * 
     * @param formalParameter 
     */
    getFormalParameter(formalParameter): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(formalParameter[0]);
        astNode.kind = SyntaxKind.formalParameter;

        //variableParaRegularParameter
        if(formalParameter[0].variableParaRegularParameter){
            this.getVariableParaRegularParameter(formalParameter[0].variableParaRegularParameter);
        }

        return astNode;
    }

    /**
     * 
     * @param variableParaRegularParameter 
     */
    getVariableParaRegularParameter(variableParaRegularParameter): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(variableParaRegularParameter[0]);
        astNode.kind = SyntaxKind.variableParaRegularParameter;

        //unannType
        if(variableParaRegularParameter[0].children.unannType){
            astNode.children.push(this.getUnannType(variableParaRegularParameter[0].children.unannType));
        }
        //variableDeclaratorId
        if(variableParaRegularParameter[0].children.variableDeclaratorId){
            astNode.children.push(this.getVariableDeclaratorId(variableParaRegularParameter[0].children.variableDeclaratorId));
        }

        return astNode;
    }

    /**
     * 
     * @param unannType 
     */
    getUnannType(unannType): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(unannType[0]);
        astNode.kind = SyntaxKind.unannType;

        //unannReferenceType
        if(unannType[0].children.unannReferenceType){
            astNode.children.push(this.getUnannReferenceType(unannType[0].children.unannReferenceType));
        }

        return astNode;
    }

    /**
     * 
     * @param variableDeclaratorId 
     */
    getVariableDeclaratorId(variableDeclaratorId): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(variableDeclaratorId[0]);
        astNode.kind = SyntaxKind.variableDeclaratorId;

        //Identifier
        if(variableDeclaratorId[0].children.Identifier){
            Java.getIdentifier(variableDeclaratorId[0].children.Identifier, astNode);
        }

        return astNode;
    }

    /**
     * 
     * @param unannReferenceType 
     */
    getUnannReferenceType(unannReferenceType): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(unannReferenceType[0]);
        astNode.kind = SyntaxKind.unannReferenceType;

        //unannClassType
        if(unannReferenceType[0].children.unannClassType){
            astNode.children.push(this.getUnannClassType(unannReferenceType[0].children.unannClassType));
        }

        return astNode;
    }

    /**
     * 
     * @param unannClassType 
     */
    getUnannClassType(unannClassType): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(unannClassType[0]);
        astNode.kind = SyntaxKind.unannClassType;

        //Identifier
        if(unannClassType[0].children.Identifier){
            Java.getIdentifier(unannClassType[0].children.Identifier, astNode);
        }

        return astNode;
    }

}