import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { JavaService } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';
import { ClassDeclaration } from '../models/class-declaration.model';
import { ClassModifier } from '../models/class-modifier.model';
import { NormalClassDeclaration } from '../models/normal-class-declaration.model';
import { ClassBody } from '../models/class-body.model';
import { ClassBodyDeclaration } from '../models/class-body-declaration.model';
import { ClassMemberDeclaration } from '../models/class-member-declaration.model';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';
import { ClassBodyChildren } from '../models/class-body-children.model';
import { ClassModifierChildren } from '../models/class-modifier-children.model';
import { ClassDeclarationChildren } from '../models/class-declaration-children.model';

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
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classDeclaration);
            this.generateAstClassChildren(classDeclaration.children, astNode);
            classDeclarationAstNode.children.push(astNode);
        });
        return classDeclarationAstNode;
    }

    /**
     * @param  {ClassDeclarationChildren} classDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassChildren(classDeclarationChildren: ClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(classDeclarationChildren) {
            this.generateAstClassModifier(classDeclarationChildren.classModifier, astNode);
            this.generateAstNormalClassDeclaration(classDeclarationChildren.normalClassDeclaration, astNode);
        }
    }

    /**
     * Gets the classModifier Node List
     * @param  {ClassModifier[]} classModifier
     * @param  {} classModifierAstNode
     * @returns AstNodeInterface
     */
    generateAstClassModifier(classModifierList: ClassModifier[], classModifierAstNode: AstNodeInterface): AstNodeInterface{
        classModifierList.forEach(classModifier => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classModifier);
            this.generateAstClassModifierChildren(classModifier.children, astNode);
            classModifierAstNode.children.push(astNode);
        });
        return classModifierAstNode;
    }

    /**
     * @param  {ClassModifierChildren} classModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassModifierChildren(classModifierChildren: ClassModifierChildren, astNode: AstNodeInterface): void {
        if(classModifierChildren) {
            JavaService.generateAstAnnotation(classModifierChildren.annotation, astNode);
            JavaService.getAstNodeInfos(classModifierChildren.Public, astNode);
        }
    }

    /**
     * Gets the normalClass Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    generateAstNormalClassDeclaration(normalClassDeclaration: NormalClassDeclaration[], normalAstNode: AstNodeInterface): AstNodeInterface{
        normalClassDeclaration.forEach(normalClass => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(normalClass);
            this.generateAstClassTypeIdentifierClassBody(normalClass.children,astNode);
            normalAstNode.children.push(astNode);
        });

        return normalAstNode;
    }

    /**
     * @param  {NormalClassDeclarationChildren} normalClassDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassTypeIdentifierClassBody(normalClassDeclarationChildren: NormalClassDeclarationChildren, astNode: AstNodeInterface): void {
        if(normalClassDeclarationChildren) {
            JavaService.getAstNodeInfos(normalClassDeclarationChildren.Class, astNode);
            JavaService.generateAstTypeIdentifier(normalClassDeclarationChildren.typeIdentifier, astNode)
            this.generateAstClassBody(normalClassDeclarationChildren.classBody, astNode);
        }
    }

    /**
     * Gets the Class Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    getNormalClass(normalClass, normalClassAstNode): AstNodeInterface{
        let astNode: AstNodeInterface = JavaService.getAstNode(normalClass);
        normalClassAstNode.children.push(astNode);
        return normalClassAstNode;
    }

    /**
     * @param  {ClassBody[]} classBodyList
     * @param  {AstNodeInterface} classBodyAstNode
     * @returns AstNodeInterface
     */
    generateAstClassBody(classBodyList: ClassBody[], classBodyAstNode: AstNodeInterface): AstNodeInterface {  
        classBodyList.forEach(classBody => {         
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classBody);
            this.generateAstClassBodyChildren(classBody.children, astNode);
            classBodyAstNode.children.push(astNode);
        });
        return classBodyAstNode;
    }
    
    /**
     * @param  {ClassBodyChildren} classBodyChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassBodyChildren(classBodyChildren: ClassBodyChildren, astNode: AstNodeInterface): void {
        if(classBodyChildren) {
            JavaService.getAstNodeInfos(classBodyChildren.lCurly,astNode);
            this.generateAstClassBodyDeclaration(classBodyChildren.classBodyDeclaration,astNode);
            JavaService.getAstNodeInfos(classBodyChildren.rCurly,astNode);
        }
    }
    
    /**
     * @param  {ClassBodyDeclaration[]} classBodyDeclarationList
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns AstNodeInterface
     */
    generateAstClassBodyDeclaration(classBodyDeclarationList: ClassBodyDeclaration[], classBodyDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        classBodyDeclarationList.forEach(classBodyDeclaration => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classBodyDeclaration);
            if(classBodyDeclaration.children.classMemberDeclaration){
                this.generateAstClassMemberDeclaration(classBodyDeclaration.children.classMemberDeclaration, astNode);
            }
            classBodyDeclarationAstNode.children.push(astNode);
        });
        return classBodyDeclarationAstNode;
    }
    
    /**
     * @param  {ClassMemberDeclaration[]} classMemberDeclarationList
     * @param  {AstNodeInterface} classMemberDeclarationAstNode
     * @returns AstNodeInterface
     */
    generateAstClassMemberDeclaration(classMemberDeclarationList: ClassMemberDeclaration[], classMemberDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        classMemberDeclarationList.forEach(classMemberDeclaration =>{
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(classMemberDeclaration);
            if(classMemberDeclaration.children.methodDeclaration){
                new AstFunctionageGenerationJavaService().generate(classMemberDeclaration.children.methodDeclaration, astNode);
            }
            classMemberDeclarationAstNode.children.push(astNode);
        });
        return classMemberDeclarationAstNode;
    }    

}