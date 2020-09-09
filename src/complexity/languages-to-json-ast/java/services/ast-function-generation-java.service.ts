import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { MethodDeclaration } from '../models/method-declaration.model';
import { MethodDeclarationChildren } from '../models/method-declaration-children.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';
import { MethodModifierChildren } from '../models/method-modifier-children.model';
import { Result } from '../models/result.model';
import { ResultChildren } from '../models/result-children.model';
import { MethodBodyChildren } from '../models/method-body-children.model';
import { UnannTypeChildren } from '../models/unann-type-children.model';
import { VariableDeclaratorIdChildren } from '../models/variable-declarator-id-children.model';
import { UnannReferenceTypeChildren } from '../models/unann-reference-type-children.model';
import { UnannClassOrInterfaceTypeChildren } from '../models/unann-class-or-interface-type-children.model';
import { DimsChildren } from '../models/dims-children.model';
import { UnannClassTypeChildren } from '../models/unann-class-type-children.model';
import { FormalParameterChildren } from '../models/formal-parameter-children.model';
import { BlockChildren } from '../models/block-children.model';
import { BlockStatementsChildren } from '../models/block-statements-children.model';
import { BlockStatementChildren } from '../models/block-statement-children.model';
import { StatementChildren } from '../models/statement-children.model';
import { ExpressionChildren } from '../models/expression-children.model';
import { IfStatementChildren } from '../models/if-statement-children.model';

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
            JavaService.generateAstNode(methodDeclarationChildren.methodModifier, astNode, this.generateAstMethodModifierChildren.bind(this));
            JavaService.generateAstNode(methodDeclarationChildren.methodHeader, astNode, this.generateAstMethodHeaderChildren.bind(this));
            JavaService.generateAstNode(methodDeclarationChildren.methodBody, astNode, this.generateAstMethodBodyChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for methodModifier children
     * @param  {MethodModifierChildren} methodModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodModifierChildren(methodModifierChildren: MethodModifierChildren, astNode: AstNodeInterface): void {
        if(methodModifierChildren) {
            JavaService.getAstNodeInfos(methodModifierChildren.Public, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Private, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Static, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Protected, astNode);
        }
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
     * Generate AstNode for methodBody children
     * @param  {MethodBodyChildren} methodBodyChildren
     * @param  {AstNodeInterface} methodBodyChildrenAstNode
     * @returns void
     */
    generateAstMethodBodyChildren(methodBodyChildren: MethodBodyChildren, methodBodyChildrenAstNode: AstNodeInterface): void {
        if(methodBodyChildren){
            JavaService.generateAstNode(methodBodyChildren.block, methodBodyChildrenAstNode, this.generateAstBlockChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for block children
     * @param  {BlockChildren} blockChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockChildren(blockChildren: BlockChildren, astNode: AstNodeInterface): void {
        if(blockChildren){
            JavaService.getAstNodeInfos(blockChildren.LCurly, astNode);
            JavaService.generateAstNode(blockChildren.blockStatements, astNode, this.generateAstBlockStatementsChildren.bind(this));
            JavaService.getAstNodeInfos(blockChildren.RCurly, astNode);
        }
    }

    /**
     * Generate AstNode for blockStatements children
     * @param  {BlockStatementsChildren} blockStatementsChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockStatementsChildren(blockStatementsChildren: BlockStatementsChildren, astNode: AstNodeInterface): void {
        if(blockStatementsChildren){
            JavaService.generateAstNode(blockStatementsChildren.blockStatement, astNode, this.generateAstBlockStatementChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for blockStatement children
     * @param  {BlockStatementChildren} blockStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockStatementChildren(blockStatementChildren: BlockStatementChildren, astNode: AstNodeInterface): void {
        if(blockStatementChildren){
            JavaService.generateAstNode(blockStatementChildren.statement, astNode, this.generateAstStatementChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for statement children
     * @param  {StatementChildren} statementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstStatementChildren(statementChildren: StatementChildren, astNode: AstNodeInterface): void {
        if(statementChildren){
            JavaService.generateAstNode(statementChildren.ifStatement, astNode, this.generateAstIfStatementChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for ifStatement children
     * @param  {any} ifStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstIfStatementChildren(ifStatementChildren: IfStatementChildren, astNode: AstNodeInterface): void {
        if(ifStatementChildren){
            JavaService.getAstNodeInfos(ifStatementChildren.If, astNode);
            JavaService.getAstNodeInfos(ifStatementChildren.LCurly, astNode);
            JavaService.generateAstNode(ifStatementChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(ifStatementChildren.RCurly, astNode);
        }
    }
    
    /**
     * Generate AstNode for expression children
     * @param  {ExpressionChildren} expressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstExpressionChildren(expressionChildren: ExpressionChildren, astNode: AstNodeInterface): void {
        if(expressionChildren){
            JavaService.generateAstNode(expressionChildren.ternaryExpression, astNode, this.generateAstExpressionChildren.bind(this));
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
            JavaService.getAstNodeInfos(resultChildren.Void, astNode);
        }
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
            JavaService.getAstNodeInfos(methodDeclaratorChildren.Identifier, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.LBrace, astNode);
            JavaService.generateAstNode(methodDeclaratorChildren.formalParameterList, astNode, this.generateAstFormalParameterListChildren.bind(this));
            JavaService.getAstNodeInfos(methodDeclaratorChildren.RBrace, astNode);
        }
    }
    
    /**
     * Generate AstNode for FormalParameterList children
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFormalParameterListChildren(formalParameterListChildren: FormalParameterListChildren, astNode: AstNodeInterface): void {
        if(formalParameterListChildren){
            JavaService.generateAstNode(formalParameterListChildren.formalParameter, astNode, this.generateAstFormalParameterChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for formalParameter children
     * @param  {FormalParameterChildren} formalParameterChildren
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns void
     */
    generateAstFormalParameterChildren(formalParameterChildren: FormalParameterChildren, formalParameterAstNode: AstNodeInterface): void {
        if(formalParameterChildren){
            JavaService.generateAstNode(formalParameterChildren.variableParaRegularParameter, formalParameterAstNode, this.generateAstFormalParameterChildren.bind(this));
        }
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
            JavaService.generateAstNode(variableParaRegularParameterChildren.unannType, astNode, this.generateAstUnannTypeChildren.bind(this));
            JavaService.generateAstNode(variableParaRegularParameterChildren.variableDeclaratorId, astNode, this.generateAstVariableDeclaratorIdChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for unannType children
     * @param  {UnannTypeChildren} unannTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannTypeChildren(unannTypeChildren: UnannTypeChildren, astNode: AstNodeInterface): void {
        if(unannTypeChildren){
            JavaService.generateAstNode(unannTypeChildren.unannReferenceType, astNode, this.generateAstUnannReferenceTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannReferenceType children
     * @param  {UnannReferenceTypeChildren} unannReferenceTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannReferenceTypeChildren(unannReferenceTypeChildren: UnannReferenceTypeChildren, astNode: AstNodeInterface): void {
        if(unannReferenceTypeChildren){
            JavaService.generateAstNode(unannReferenceTypeChildren.unannClassOrInterfaceType, astNode, this.generateAstUnannClassOrInterfaceTypeChildren.bind(this));
            JavaService.generateAstNode(unannReferenceTypeChildren.dims, astNode, this.generateAstDimsChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannClassOrInterfaceType children
     * @param  {UnannClassOrInterfaceTypeChildren} unannClassOrInterfaceTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannClassOrInterfaceTypeChildren(unannClassOrInterfaceTypeChildren: UnannClassOrInterfaceTypeChildren, astNode: AstNodeInterface): void {
        if(unannClassOrInterfaceTypeChildren){
            JavaService.generateAstNode(unannClassOrInterfaceTypeChildren.unannClassType, astNode, this.generateAstUnannClassTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannClassType children
     * @param  {UnannClassTypeChildren} unannClassTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannClassTypeChildren(unannClassTypeChildren: UnannClassTypeChildren, astNode: AstNodeInterface): void {
        if(unannClassTypeChildren){
            JavaService.getAstNodeInfos(unannClassTypeChildren.Identifier, astNode);
        }
    }
    
    /**
     * Generate AstNode for dims children
     * @param  {DimsChildren} dimsChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstDimsChildren(dimsChildren: DimsChildren, astNode: AstNodeInterface): void {
        if(dimsChildren){
            JavaService.getAstNodeInfos(dimsChildren.LSquare, astNode);
            JavaService.getAstNodeInfos(dimsChildren.RSquare, astNode);
        }
    }

    /**
     * Generate AstNode for variableDeclaratorId children
     * @param  {VariableDeclaratorIdChildren} variableDeclaratorIdChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstVariableDeclaratorIdChildren(variableDeclaratorIdChildren: VariableDeclaratorIdChildren, astNode: AstNodeInterface): void {
        if(variableDeclaratorIdChildren){
            JavaService.getAstNodeInfos(variableDeclaratorIdChildren.Identifier, astNode);
        }
    }
    
}
