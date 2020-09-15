import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';
import { ClassBodyChildren } from '../models/class-body-children.model';
import { ClassModifierChildren } from '../models/class-modifier-children.model';
import { ClassDeclarationChildren } from '../models/class-declaration-children.model';
import { ClassMemberDeclarationChildren } from '../models/class-member-declaration-children.model';
import { ClassBodyDeclarationChildren } from '../models/class-body-declaration-children.model';
import { ClassDeclarationElement } from '../models/class-declaration-element.model';

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
    generateAstClassChildren(classDeclarationChildren: ClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(classDeclarationChildren) {
            JavaService.generateAstNode(classDeclarationChildren.classModifier, astNode, this.generateAstClassModifierChildren.bind(this));
            JavaService.generateAstNode(classDeclarationChildren.normalClassDeclaration, astNode, this.generateAstClassTypeIdentifierClassBody.bind(this));
        }
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
     * Generate AstNode for normalClassDeclaration children
     * @param  {NormalClassDeclarationChildren} normalClassDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstClassTypeIdentifierClassBody(normalClassDeclarationChildren: NormalClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(normalClassDeclarationChildren) {
            JavaService.getAstNodeInfos(normalClassDeclarationChildren.Class, astNode);
            JavaService.generateAstTypeIdentifier(normalClassDeclarationChildren.typeIdentifier, astNode)
            JavaService.generateAstNode(normalClassDeclarationChildren.classBody, astNode, this.generateAstClassBodyChildren.bind(this));
        }
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
            JavaService.generateAstNode(classBodyChildren.classBodyDeclaration,astNode, this.generateAstClassBodyDeclarationChildren.bind(this));
            JavaService.getAstNodeInfos(classBodyChildren.RCurly,astNode);
        }
    }
    
    /**
     * Generate AstNode for classBodyDeclaration children
     * @param  {ClassBodyDeclarationChildren} classBodyDeclarationChildren
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns void
     */
    private generateAstClassBodyDeclarationChildren(classBodyDeclarationChildren: ClassBodyDeclarationChildren, classBodyDeclarationAstNode: AstNodeInterface): void {
        if(classBodyDeclarationChildren){
            JavaService.generateAstNode(classBodyDeclarationChildren.classMemberDeclaration, classBodyDeclarationAstNode, this.generateAstClassMemberDeclarationChildren.bind(this));
        }
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
