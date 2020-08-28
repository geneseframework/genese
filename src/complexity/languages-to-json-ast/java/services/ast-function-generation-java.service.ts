import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { JavaService } from './java.service';
import { MethodDeclaration } from '../models/method-declaration.model';
import { MethodDeclarationChildren } from '../models/method-declaration-children.model';
import { MethodHeader } from '../models/method-header.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';
import { FormalParameterList } from '../models/formal-parameter-list.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';
import { MethodModifier } from '../models/method-modifier.model';

/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
export class AstFunctionageGenerationJavaService {
    
    /**
     * Gets the methodDeclaration Node
     * @param methodDeclaration // AST Node
     */
    generate(methodDeclarationList: MethodDeclaration[], methodDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        methodDeclarationList.forEach(methodDeclaration => {
            let astNode = JavaService.getAstNodeWithChildren(methodDeclaration);
            astNode.kind = SyntaxKind.methodDeclaration;
            this.generateAstMethodDeclaration(methodDeclaration.children, astNode);
            methodDeclarationAstNode.children.push(astNode);
        });

        return methodDeclarationAstNode;
    }

    /**
     * @param  {MethodDeclarationChildren} methodDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaration(methodDeclarationChildren: MethodDeclarationChildren, astNode: AstNodeInterface): void {
        if(MethodDeclarationChildren) {
            this.generateAstMethodModifier(methodDeclarationChildren.methodModifier, astNode);
            this.generateAstMethodHeader(methodDeclarationChildren.methodHeader, astNode);
            this.generateAstMethodBody(methodDeclarationChildren.methodBody, astNode);
        }
    }

    /**
     * Gets the methodModifier Node List
     * @param methodModifier // AST Node
     */
    generateAstMethodModifier(methodModifierList: MethodModifier[], astNodeMethodModifier: AstNodeInterface): AstNodeInterface{
        methodModifierList.forEach(methodModifier => {
            let astNode = JavaService.getAstNodeWithChildren(methodModifier);
            astNode.kind = SyntaxKind.methodModifier;
        })

        return astNodeMethodModifier;
    }
    
    /**
     * Gets the methodHeader Node
     * @param methodHeader // AST Node
     */
    generateAstMethodHeader(methodHeaderList: MethodHeader[], methodHeaderAstNode: AstNodeInterface): AstNodeInterface {
        methodHeaderList.forEach(methodHeader => {
            let astNode = JavaService.getAstNodeWithChildren(methodHeader);
            astNode.kind = SyntaxKind.methodHeader;
            this.generateAstMethodHeaderChildren(methodHeader.children, astNode);
            methodHeaderAstNode.children.push(astNode);
        });
        return methodHeaderAstNode;
    }

    /**
     * @param  {MethodHeaderChildren} methodHeaderChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodHeaderChildren(methodHeaderChildren: MethodHeaderChildren, astNode: AstNodeInterface): void {
        if(methodHeaderChildren) {
            //this.getResult(methodHeader.children.result, astNode);
            this.generateAstMethodDeclarator(methodHeaderChildren.methodDeclarator, astNode);
        }
    }

    /**
     * Gets the methodBody Node
     * @param methodBody // AST Node
     */
    generateAstMethodBody(methodBody, methodBodyAstNode): AstNodeInterface{
        let astNode = JavaService.getAstNode(methodBody[0]);
        astNode.kind = SyntaxKind.methodDeclaration;

        methodBodyAstNode.children.push(astNode);

        return methodBodyAstNode;
    }

    /**
     * 
     * @param result // AST Node
     */
    getResult(result, resultAstNode): AstNodeInterface{
        let astNode = JavaService.getAstNodeWithChildren(result[0]);
        astNode.kind = SyntaxKind.Result;
        if(result[0].children.Void){
            astNode.children.push(JavaService.getAstNode(result[0].children.Void));
        }
        resultAstNode.children.push(astNode);
        return resultAstNode; 
    }

    /**
     * @param  {MethodDeclarator[]} methodDeclaratorList
     * @param  {} methodDeclaratorAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodDeclarator(methodDeclaratorList: MethodDeclarator[], methodDeclaratorAstNode): AstNodeInterface {
        methodDeclaratorList.forEach(methodDeclarator => {
            let astNode = JavaService.getAstNodeWithChildren(methodDeclarator[0]);
            astNode.kind = SyntaxKind.methodDeclarator;
            this.generateAstMethodDeclaratorChildren(methodDeclarator.children,astNode);
            methodDeclaratorAstNode.children.push(astNode);
        });
        return methodDeclaratorAstNode;
    }

    /**
     * @param  {MethodDeclaratorChildren} methodDeclaratorChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaratorChildren(methodDeclaratorChildren: MethodDeclaratorChildren,astNode: AstNodeInterface): void {
        if(methodDeclaratorChildren) {
            JavaService.getAstNodeInfos(methodDeclaratorChildren.Identifier, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.LBrace, astNode);
            this.generateAstFormalParameterList(methodDeclaratorChildren.formalParameterList, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.RBrace, astNode);
        }
    }

    /**
     * @param  {} formalParameterList
     * @param  {} formalParameterAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameterList(formalParameterList: FormalParameterList[], formalParameterAstNode: AstNodeInterface): AstNodeInterface {
        formalParameterList.forEach(formalParameter => {
            let astNode = JavaService.getAstNodeWithChildren(formalParameter);
            astNode.kind = SyntaxKind.formalParameter;
            if(formalParameter.children){
                this.generateAstFormalParameter(formalParameter.children, astNode);
            }
            formalParameterAstNode.children.push(astNode);
        })
        return formalParameterAstNode;
    }

    /**
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameter(formalParameterListChildren: FormalParameterListChildren, formalParameterAstNode: AstNodeInterface): AstNodeInterface{
        if(formalParameterListChildren?.formalParameter) {
            formalParameterListChildren.formalParameter.forEach(child => {
                let astNode = JavaService.getAstNodeWithChildren(formalParameterListChildren.formalParameter);
                astNode.kind = SyntaxKind.formalParameter;

                if(child.children?.variableParaRegularParameter){
                    this.generateAstVariableParaRegularParameter(child.children.variableParaRegularParameter, astNode);
                }
                formalParameterAstNode.children.push(astNode);
            })
        }
        return formalParameterAstNode;
    }

    /**
     * @param  {VariableParaRegularParameter[]} variableParaRegularParameterList
     * @param  {AstNodeInterface} vPRPAstNode
     * @returns AstNodeInterface
     */
    generateAstVariableParaRegularParameter(variableParaRegularParameterList: VariableParaRegularParameter[], vPRPAstNode: AstNodeInterface): AstNodeInterface {
        variableParaRegularParameterList.forEach(variableParaRegularParameter => {
            let astNode = JavaService.getAstNodeWithChildren(variableParaRegularParameter);
            astNode.kind = SyntaxKind.variableParaRegularParameter;
            this.generateAstVariableParaRegularParameterChildren(variableParaRegularParameter.children, astNode);
            vPRPAstNode.children.push(astNode);
        })
        return vPRPAstNode;
    }

    /**
     * @param  {VariableParaRegularParameterChildren} variableParaRegularParameterChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstVariableParaRegularParameterChildren(variableParaRegularParameterChildren: VariableParaRegularParameterChildren, astNode: AstNodeInterface): void {
        if(variableParaRegularParameterChildren) {
            JavaService.getAstNodeInfos(variableParaRegularParameterChildren.unannType, astNode);
            JavaService.getAstNodeInfos(variableParaRegularParameterChildren.variableDeclaratorId, astNode);
        }
    }

    /**
     * 
     * @param unannType 
     */
    getUnannType(unannType): AstNodeInterface{
        let astNode = JavaService.getAstNodeWithChildren(unannType[0]);
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
        let astNode = JavaService.getAstNodeWithChildren(variableDeclaratorId[0]);
        astNode.kind = SyntaxKind.variableDeclaratorId;

        //Identifier
        if(variableDeclaratorId[0].children.Identifier){
            JavaService.getIdentifier(variableDeclaratorId[0].children.Identifier, astNode);
        }

        return astNode;
    }

    /**
     * 
     * @param unannReferenceType 
     */
    getUnannReferenceType(unannReferenceType): AstNodeInterface{
        let astNode = JavaService.getAstNodeWithChildren(unannReferenceType[0]);
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
        let astNode = JavaService.getAstNodeWithChildren(unannClassType[0]);
        astNode.kind = SyntaxKind.unannClassType;

        //Identifier
        if(unannClassType[0].children.Identifier){
            JavaService.getIdentifier(unannClassType[0].children.Identifier, astNode);
        }

        return astNode;
    }

}