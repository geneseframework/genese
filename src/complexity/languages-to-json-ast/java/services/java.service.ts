import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Node } from '../models/node.model';
import { Infos } from '../models/infos.model';
import { AnnotationElement } from '../models/annotation-element.model';
import { TypeIdentifierElement } from '../models/type-identifier-element.model';
import { AnnotationChildren } from '../models/annotation-children.model';
import { TypeNameElement } from '../models/type-name-element.model';
import { TypeNameChildren } from '../models/type-name-children.model';
import { Children } from '../interfaces/Children';
import { TypeIdentifierChildren } from '../models/type-identifier-children.model';

/**
 * Service contains common functions
 */
export class JavaService {

    /**
     * Gets the astNode with children
     * @param  {Node} node
     * @returns AstNodeInterface
     */
    static getAstNodeWithChildren(node: Node): AstNodeInterface {
        let astNode: AstNodeInterface = JavaService.getAstNode(node);
        astNode.children = [];
        return astNode;
    }
    
    /**
     * Gets the AstNode of Node
     * @param  {Node} node
     * @returns AstNodeInterface
     */
    static getAstNode(node: Node): AstNodeInterface {
        let astNode: AstNodeInterface;
        if(node?.location){
            astNode = {
                end: node.location.endOffset,
                kind: node.name,
                name: node.name,
                pos: node.location.startOffset,
                start: node.location.startOffset
            }
        }
        return astNode;
    }
    

    /**
     * Generate AstNode from node informations
     * @param  {Infos[]} infos
     * @param  {AstNodeInterface} astNode
     * @returns AstNodeInterface
     */
    static getAstNodeInfos(infos: Infos[], astNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(infos)) {
            infos.forEach(info => {
                if(info.image !== ''){
                    let childrenAstNode: AstNodeInterface = {
                        end: info.endOffset,
                        kind: info.image,
                        name: info.image,
                        pos: info.startOffset,
                        start: info.startOffset
                    }
                    this.pushChildren(astNode, childrenAstNode);
                }
            });
        }
        return astNode;
    }


    /**
     * Generate AstNode for annotation
     * @param  {AnnotationElement[]} annotation
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstAnnotation(annotation: AnnotationElement[], annotationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(annotation)){
            annotation.forEach(annotationElement => {
                if(annotationElement.name !== ''){
                    let astNode = JavaService.getAstNodeWithChildren(annotationElement);
                    JavaService.generateAstAnnotationChildren(annotationElement.children, astNode);
                    this.pushChildren(annotationAstNode, astNode);
                }
            })
        }
        return annotationAstNode;
    }

    /**
     * Generate AstNode for annotation children
     * @param  {AnnotationChildren} annotationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    static generateAstAnnotationChildren(annotationChildren: AnnotationChildren, astNode: AstNodeInterface): void {
        if(annotationChildren) {
            JavaService.getAstNodeInfos(annotationChildren.At, astNode);
            JavaService.generateAstTypeName(annotationChildren.typeName, astNode);
        } 
    }
    
    /**
     * Generate AstNode for typeName
     * @param  {TypeNameElement[]} typeName
     * @param  {AstNodeInterface} typeNameAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeName(typeName: TypeNameElement[], typeNameAstNode: AstNodeInterface): AstNodeInterface {
        return this.generateAstNode(typeName, typeNameAstNode, this.generateAstTypeNameChildren.bind(this));
    }

    /**
     * Generate AstNode for typeName children
     * @param  {TypeNameChildren} typeNameChildren
     * @param  {AstNodeInterface} typeNameChildrenAstNode
     * @returns void
     */
    static generateAstTypeNameChildren(typeNameChildren: TypeNameChildren, typeNameChildrenAstNode: AstNodeInterface): void {
        if(typeNameChildren){
            JavaService.getAstNodeInfos(typeNameChildren.Identifier, typeNameChildrenAstNode);
        }
    }

    /**
     * Generate AstNode for typeIdentifier
     * @param  {TypeIdentifierElement[]} typeIdentifier
     * @param  {AstNodeInterface} typeIdentifierAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeIdentifier(typeIdentifier: TypeIdentifierElement[], typeIdentifierAstNode: AstNodeInterface): AstNodeInterface {
        return this.generateAstNode(typeIdentifier, typeIdentifierAstNode, this.generateAstTypeIdentifierChildren.bind(this));
    }
    
    /**
     * Generate AstNode for typeIdentifier children
     * @param  {TypeIdentifierChildren} typeIdentifierChildren
     * @param  {AstNodeInterface} typeIdentifierChildrenAstNode
     * @returns void
     */
    static generateAstTypeIdentifierChildren(typeIdentifierChildren: TypeIdentifierChildren, typeIdentifierChildrenAstNode: AstNodeInterface): void {
        if(typeIdentifierChildren) {
            JavaService.getAstNodeInfos(typeIdentifierChildren.Identifier, typeIdentifierChildrenAstNode);
        }
    }

    /**
     * Generic function used to generate AstNode for declaration elements
     * @param  {Children[]} declarations
     * @param  {AstNodeInterface} declarationAstNode
     * @param  {(children:any,astNode:AstNodeInterface)=>void} method
     * @returns AstNodeInterface
     */
    static generateAstNode(declarations: Children[], declarationAstNode: AstNodeInterface, method: (children: any, astNode: AstNodeInterface) => void): AstNodeInterface {
        if(Array.isArray(declarations)){
            declarations.forEach(declaration => {
                if(declaration.name !== '') {
                    let astNodeElement: AstNodeInterface = JavaService.getAstNodeWithChildren(declaration);
                    method(declaration.children, astNodeElement);
                    this.pushChildren(declarationAstNode, astNodeElement);
                }
            })
        }
        return declarationAstNode;
    }

    /**
     * Push astNode on element children
     * @param  {any} element
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    static pushChildren(element: any, astNode: AstNodeInterface): void {
        if(element?.children) {
            element.children.push(astNode);
        }
    }
    
}
