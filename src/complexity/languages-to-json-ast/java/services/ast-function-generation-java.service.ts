import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
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
import { MethodModifierChildren } from '../models/method-modifier-children.model';
import { Result } from '../models/result.model';
import { FormalParameter } from '../models/formal-parameter.model';
import { MethodBody } from '../models/method-body.model';
import { ResultChildren } from '../models/result-children.model';
import { MethodBodyChildren } from '../models/method-body-children.model';

/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
export class AstFunctionageGenerationJavaService {
    
    /**
     * Generate AstNode for methodModifier
     * @param  {MethodDeclaration[]} methodDeclaration
     * @param  {AstNodeInterface} methodDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(methodDeclaration: MethodDeclaration[], methodDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(methodDeclaration, methodDeclarationAstNode, this.generateAstMethodDeclaration.bind(this));
    }

    /**
     * Generate AstNode for methodDeclarationChildren
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
     * Generate AstNode for methodModifier
     * @param  {MethodModifier[]} methodModifier
     * @param  {AstNodeInterface} methodModifierAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodModifier(methodModifier: MethodModifier[], methodModifierAstNode: AstNodeInterface): AstNodeInterface{
        return JavaService.generateAstNode(methodModifier, methodModifierAstNode, this.generateAstMethodModifierChildren.bind(this));
    }

    /**
     * Generate AstNode for methodModifier children
     * @param  {MethodModifierChildren} methodModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodModifierChildren(methodModifierChildren: MethodModifierChildren, astNode: AstNodeInterface): void {
        if(methodModifierChildren) {
            JavaService.getAstNodeInfos(methodModifierChildren.public, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.private, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.static, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.protected, astNode);
        }
    }

    /**
     * Generate AstNode for methodHeader
     * @param  {MethodHeader[]} methodHeader
     * @param  {AstNodeInterface} methodHeaderAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodHeader(methodHeader: MethodHeader[], methodHeaderAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(methodHeader, methodHeaderAstNode, this.generateAstMethodHeaderChildren.bind(this));
    }

    /**
     * Generate AstNode for methodHeader children
     * @param  {MethodHeaderChildren} methodHeaderChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodHeaderChildren(methodHeaderChildren: MethodHeaderChildren, astNode: AstNodeInterface): void {
        if(methodHeaderChildren) {
            this.generateAstResult(methodHeaderChildren.result, astNode);
            this.generateAstMethodDeclarator(methodHeaderChildren.methodDeclarator, astNode);
        }
    }

    /**
     * Generate AstNode for result
     * @param  {Result} result
     * @param  {AstNodeInterface} resultAstNode
     * @returns void
     */
    generateAstResult(result: Result[], resultAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(result, resultAstNode, this.generateAstResultChildren.bind(this));
    }
    
    /**
     * Generate AstNode for result children
     * @param  {Result} result
     * @param  {AstNodeInterface} resultAstNode
     * @returns void
     */
    generateAstResultChildren(resultChildren: ResultChildren, astNode: AstNodeInterface): void {
        if(resultChildren) {
            JavaService.getAstNodeInfos(resultChildren.void, astNode);
        }
    }
    
    /**
     * Generate AstNode for methodBody
     * @param  {MethodBody[]} methodBody
     * @param  {AstNodeInterface} methodBodyAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodBody(methodBody: MethodBody[], methodBodyAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(methodBody, methodBodyAstNode, this.generateAstMethodBodyChildren.bind(this));
    }

    /**
     * Generate AstNode for methodBody children
     * @param  {MethodBodyChildren} _methodBodyChildren
     * @param  {AstNodeInterface} _methodBodyChildrenAstNode
     * @returns void
     */
    generateAstMethodBodyChildren(_methodBodyChildren: MethodBodyChildren, _methodBodyChildrenAstNode: AstNodeInterface): void {

    }
    
    /**
     * Generate AstNode for methodDeclarator
     * @param  {MethodDeclarator[]} methodDeclarator
     * @param  {} methodDeclaratorAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodDeclarator(methodDeclarator: MethodDeclarator[], methodDeclaratorAstNode): AstNodeInterface {
        return JavaService.generateAstNode(methodDeclarator, methodDeclaratorAstNode, this.generateAstMethodDeclaratorChildren.bind(this));
    }

    /**
     * Generate AstNode for methodDeclarator children
     * @param  {MethodDeclaratorChildren} methodDeclaratorChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaratorChildren(methodDeclaratorChildren: MethodDeclaratorChildren,astNode: AstNodeInterface): void {
        if(methodDeclaratorChildren) {
            JavaService.getAstNodeInfos(methodDeclaratorChildren.identifier, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.lBrace, astNode);
            this.generateAstFormalParameterList(methodDeclaratorChildren.formalParameterList, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.rBrace, astNode);
        }
    }

    
    /**
     * Generate AstNode for FormalParameterList
     * @param  {FormalParameterList[]} formalParameterList
     * @param  {AstNodeInterface} formalParameterListAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameterList(formalParameterList: FormalParameterList[], formalParameterListAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(formalParameterList, formalParameterListAstNode, this.generateAstFormalParameterListChildren.bind(this));
    }
    
    /**
     * Generate AstNode for FormalParameterList children
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFormalParameterListChildren(formalParameterListChildren: FormalParameterListChildren, astNode: AstNodeInterface): void {
        if(formalParameterListChildren){
            this.generateAstFormalParameter(formalParameterListChildren, astNode);
        }
    }

    /**
     * Generate AstNode for FormalParameterList children
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameter(formalParameterListChildren: FormalParameterListChildren, formalParameterAstNode: AstNodeInterface): AstNodeInterface{
        if(formalParameterListChildren?.formalParameter) {
            formalParameterListChildren.formalParameter.forEach(child => {
                this.generateAstFormalParameterChildren(child, formalParameterAstNode);
            })
        }
        return formalParameterAstNode;
    }
    
    /**
     * Generate AstNode for FormalParameter
     * @param  {FormalParameter} formalParameter
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns void
     */
    generateAstFormalParameterChildren(formalParameter: FormalParameter, formalParameterAstNode: AstNodeInterface): void {
        let astNode = JavaService.getAstNodeWithChildren(formalParameter);
        if(formalParameter.children?.variableParaRegularParameter){
            this.generateAstVariableParaRegularParameter(formalParameter.children.variableParaRegularParameter, astNode);
        }
        formalParameterAstNode.children.push(astNode);
    }
    
    /**
     * Generate AstNode for VariableParaRegularParameter
     * @param  {VariableParaRegularParameter[]} variableParaRegularParameterList
     * @param  {AstNodeInterface} vPRPAstNode
     * @returns AstNodeInterface
     */
    generateAstVariableParaRegularParameter(variableParaRegularParameterList: VariableParaRegularParameter[], vPRPAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(variableParaRegularParameterList, vPRPAstNode, this.generateAstFormalParameterListChildren.bind(this));
    }

    /**
     * Generate AstNode for VariableParaRegularParameter children
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
}
