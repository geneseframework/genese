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
     * Generate AstNode for classDeclaration
     * @param  {ClassDeclarationElement[]} classDeclaration
     * @param  {AstNodeInterface} classDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(classDeclaration: ClassDeclarationElement[], classDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(classDeclaration, classDeclarationAstNode, this.generateAstClassChildren.bind(this));
    }

    /**
     * Generate AstNode for classDeclaration children
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
     * Generate AstNode for classModifier
     * @param  {ClassModifierElement[]} classModifier
     * @param  {AstNodeInterface} classModifierAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassModifier(classModifier: ClassModifierElement[], classModifierAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(classModifier, classModifierAstNode, this.generateAstClassModifierChildren.bind(this));
    }

    /**
     * Generate AstNode for classModifier children
     * @param  {ClassModifierChildren} classModifierChildren
     * @param  {AstNodeInterface} classModifierChildrenAstNode
     * @returns void
     */
    generateAstClassModifierChildren(classModifierChildren: ClassModifierChildren, classModifierChildrenAstNode: AstNodeInterface): void {
        if(classModifierChildren) {
            JavaService.generateAstAnnotation(classModifierChildren.annotation, classModifierChildrenAstNode);
            JavaService.getAstNodeInfos(classModifierChildren.Public, classModifierChildrenAstNode);
        }
    }
    
    /**
     * Generate AstNode for normalClassDeclaration
     * @param  {NormalClassDeclarationElement[]} normalClassDeclaration
     * @param  {AstNodeInterface} normalClassDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstNormalClassDeclaration(normalClassDeclaration: NormalClassDeclarationElement[], normalClassDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(normalClassDeclaration, normalClassDeclarationAstNode, this.generateAstClassTypeIdentifierClassBody.bind(this));
    }

    /**
     * Generate AstNode for normalClassDeclaration children
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
     * Generate AstNode for classBody
     * @param  {ClassBodyElement[]} classBody
     * @param  {AstNodeInterface} classBodyAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassBody(classBody: ClassBodyElement[], classBodyAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(classBody, classBodyAstNode, this.generateAstClassBodyChildren.bind(this));
    }

    /**
     * Generate AstNode for classBody children
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
     * Generate AstNode for classBodyDeclaration
     * @param  {ClassBodyDeclarationElement[]} classBodyDeclaration
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassBodyDeclaration(classBodyDeclaration: ClassBodyDeclarationElement[], classBodyDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(classBodyDeclaration, classBodyDeclarationAstNode, this.generateAstClassBodyDeclarationChildren.bind(this));
    }
    
    /**
     * Generate AstNode for classBodyDeclaration children
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
     * Generate AstNode for classMemberDeclaration
     * @param  {ClassMemberDeclarationElement[]} classMemberDeclaration
     * @param  {AstNodeInterface} classMemberDeclarationAstNode
     * @returns AstNodeInterface
     */
    private generateAstClassMemberDeclaration(classMemberDeclaration: ClassMemberDeclarationElement[], classMemberDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(classMemberDeclaration, classMemberDeclarationAstNode, this.generateAstClassMemberDeclarationChildren.bind(this));
    }

    /**
     * Generate AstNode for classMemberDeclaration children
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
