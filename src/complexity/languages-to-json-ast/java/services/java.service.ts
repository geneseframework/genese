import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Node } from '../models/node.model';
import { Infos } from '../models/infos.model';
import { AnnotationElement } from '../models/annotation-element.model';
import { TypeIdentifierElement } from '../models/type-identifier-element.model';
import { AnnotationChildren } from '../models/annotation-children.model';
import { TypeNameElement } from '../models/type-name-element.model';
import { TypeNameChildren } from '../models/type-name-children.model';

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
                    if(astNode?.children){
                        astNode.children.push(childrenAstNode);
                    }
                }
            });
        }
        return astNode;
    }


    /**
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
                    if(annotationAstNode?.children){
                        annotationAstNode.children.push(astNode);
                    }
                }
            })
        }
        return annotationAstNode;
    }


    /**
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
     * @param  {TypeNameElement[]} typeName
     * @param  {AstNodeInterface} typeNameAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeName(typeName: TypeNameElement[], typeNameAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(typeName)){
            typeName.forEach(typeNameElement => {
                let astNode = JavaService.getAstNodeWithChildren(typeNameElement);
                JavaService.generateAstTypeNameChildren(typeNameElement.children, astNode);
                if(typeNameAstNode?.children){
                    typeNameAstNode.children.push(astNode);
                }
            });
        }
        return typeNameAstNode;
    }


    /**
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
     * @param  {TypeIdentifierElement[]} typeIdentifier
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeIdentifier(typeIdentifier: TypeIdentifierElement[], annotationAstNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(typeIdentifier)){
            typeIdentifier.forEach(typeIdentifierElement => {
                let astNode = JavaService.getAstNodeWithChildren(typeIdentifierElement);
                if(typeIdentifierElement.children?.Identifier) {
                    JavaService.getAstNodeInfos(typeIdentifierElement.children.Identifier, astNode);
                }
                if(annotationAstNode?.children){
                    annotationAstNode.children.push(astNode);
                }
            });
        }
        return annotationAstNode;
    }

}
