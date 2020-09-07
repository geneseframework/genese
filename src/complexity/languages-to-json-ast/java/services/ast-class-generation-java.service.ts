import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';
import { ClassDeclarationElement } from '../models/class-declaration-element.model';
import { NormalClassDeclarationElement } from '../models/normal-class-declaration-element.model';
import { ClassBodyDeclarationElement } from '../models/class-body-declaration-element.model';
import { ClassMemberDeclarationElement } from '../models/class-member-declaration-element.model';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';
import { ClassBodyChildren } from '../models/class-body-children.model';
import { ClassModifierChildren } from '../models/class-modifier-children.model';
import { ClassDeclarationChildren } from '../models/class-declaration-children.model';
import { ClassBodyElement } from '../models/class-body-element.model';
import { ClassModifierElement } from '../models/class-modifier-element.model';
import { ClassMemberDeclarationChildren } from '../models/class-member-declaration-children';
import { ClassBodyDeclarationChildren } from '../models/class-body-declaration-children.model';

/**
 * - Generate AstNode for class from their Abstract Syntax Tree (AST)
 */
export class AstClassGenerationJavaService {

    /**
     * @param  {ClassDeclarationElement[]} classDeclaration
     * @param  {AstNodeInterface} classDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(classDeclaration: ClassDeclarationElement[], classDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(classDeclaration)){
            classDeclaration.forEach(classDeclarationElement => {         
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classDeclarationElement);
                this.generateAstClassChildren(classDeclarationElement.children, astNode);
                if(classDeclarationAstNode?.children){
                    classDeclarationAstNode.children.push(astNode);  
                }
            });
        }
        return classDeclarationAstNode;
    }

    /**
     * @param  {ClassDeclarationChildren} classDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstClassChildren(classDeclarationChildren: ClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(classDeclarationChildren) {
            this.generateAstClassModifier(classDeclarationChildren.classModifier, astNode);
            this.generateAstNormalClassDeclaration(classDeclarationChildren.normalClassDeclaration, astNode);
        }
    }

    /**
     * @param  {ClassModifier[]} classModifierList
     * @param  {AstNodeInterface} classModifierAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassModifier(classModifier: ClassModifierElement[], classModifierAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(classModifier)){
            classModifier.forEach(classModifierElement => {
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classModifierElement);
                this.generateAstClassModifierChildren(classModifierElement.children, astNode);
                if(classModifierAstNode?.children){
                    classModifierAstNode.children.push(astNode);
                }
            });
        }
        return classModifierAstNode;
    }

    /**
     * @param  {ClassModifierChildren} classModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstClassModifierChildren(classModifierChildren: ClassModifierChildren, classModifierChildrenAstNode: AstNodeInterface): void {
        if(classModifierChildren) {
            JavaService.generateAstAnnotation(classModifierChildren.annotation, classModifierChildrenAstNode);
            JavaService.getAstNodeInfos(classModifierChildren.Public, classModifierChildrenAstNode);
        }
    }

    
    /**
     * @param  {NormalClassDeclarationElement[]} normalClassDeclaration
     * @param  {AstNodeInterface} normalClassDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstNormalClassDeclaration(normalClassDeclaration: NormalClassDeclarationElement[], normalClassDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(normalClassDeclaration)){
            normalClassDeclaration.forEach(normalClass => {
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(normalClass);
                this.generateAstClassTypeIdentifierClassBody(normalClass.children,astNode);
                if(normalClassDeclarationAstNode?.children){
                    normalClassDeclarationAstNode.children.push(astNode);
                }
            });
        }
        return normalClassDeclarationAstNode;
    }

    /**
     * @param  {NormalClassDeclarationChildren} normalClassDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstClassTypeIdentifierClassBody(normalClassDeclarationChildren: NormalClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(normalClassDeclarationChildren) {
            JavaService.getAstNodeInfos(normalClassDeclarationChildren.Class, astNode);
            JavaService.generateAstTypeIdentifier(normalClassDeclarationChildren.typeIdentifier, astNode)
            this.generateAstClassBody(normalClassDeclarationChildren.classBody, astNode);
        }
    }


    /**
     * @param  {ClassBodyElement[]} classBody
     * @param  {AstNodeInterface} classBodyAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassBody(classBody: ClassBodyElement[], classBodyAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(classBody)){
            classBody.forEach(classBodyElement => {         
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classBodyElement);
                this.generateAstClassBodyChildren(classBodyElement.children, astNode);
                if(classBodyAstNode?.children){
                    classBodyAstNode.children.push(astNode);
                }
            });
        }
        return classBodyAstNode;
    }
    

    /**
     * @param  {ClassBodyChildren} classBodyChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstClassBodyChildren(classBodyChildren: ClassBodyChildren, astNode: AstNodeInterface): void {
        if(classBodyChildren) {
            JavaService.getAstNodeInfos(classBodyChildren.LCurly,astNode);
            this.generateAstClassBodyDeclaration(classBodyChildren.classBodyDeclaration,astNode);
            JavaService.getAstNodeInfos(classBodyChildren.RCurly,astNode);
        }
    }
    

    /**
     * @param  {ClassBodyDeclarationElement[]} classBodyDeclaration
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassBodyDeclaration(classBodyDeclaration: ClassBodyDeclarationElement[], classBodyDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(classBodyDeclaration)){
            classBodyDeclaration.forEach(classBodyDeclarationElement => {
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classBodyDeclarationElement);
                this.generateAstClassBodyDeclarationChildren(classBodyDeclarationElement.children, astNode);
                if(classBodyDeclarationAstNode?.children){
                    classBodyDeclarationAstNode.children.push(astNode);
                }
            });
        }
        return classBodyDeclarationAstNode;
    }
    
    
    /**
     * @param  {ClassBodyDeclarationChildren} classBodyDeclarationChildren
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns void
     */
    private generateAstClassBodyDeclarationChildren(classBodyDeclarationChildren: ClassBodyDeclarationChildren, classBodyDeclarationAstNode: AstNodeInterface): void {
        if(classBodyDeclarationChildren){
            this.generateAstClassMemberDeclaration(classBodyDeclarationChildren.classMemberDeclaration, classBodyDeclarationAstNode);
        }
    }

    
    /**
     * @param  {ClassMemberDeclarationElement[]} classMemberDeclaration
     * @param  {AstNodeInterface} classMemberDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassMemberDeclaration(classMemberDeclaration: ClassMemberDeclarationElement[], classMemberDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(classMemberDeclaration)){
            classMemberDeclaration.forEach(classMemberDeclarationElement =>{
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classMemberDeclarationElement);
                this.generateAstClassMemberDeclarationChildren(classMemberDeclarationElement.children, astNode);
                if(classMemberDeclarationAstNode?.children){
                    classMemberDeclarationAstNode.children.push(astNode);
                }
            });
        }
        return classMemberDeclarationAstNode;
    }


    /**
     * @param  {ClassMemberDeclarationChildren} classMemberDeclarationChildren
     * @param  {AstNodeInterface} classMemberDeclarationChildrenAstNode
     * @returns void
     */
    private generateAstClassMemberDeclarationChildren(classMemberDeclarationChildren: ClassMemberDeclarationChildren, classMemberDeclarationChildrenAstNode: AstNodeInterface): void {
        if(classMemberDeclarationChildren){
            new AstFunctionageGenerationJavaService().generate(classMemberDeclarationChildren.methodDeclaration, classMemberDeclarationChildrenAstNode);
        }
    }

}
