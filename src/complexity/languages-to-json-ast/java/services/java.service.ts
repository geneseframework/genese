import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Infos } from '../models/infos.model';
import { Annotation } from '../models/annotation.model';
import { TypeIdentifier } from '../models/type-identifier.model';
import { AnnotationChildren } from '../models/annotation-children.model';

/**
 * Service contains common functions
 */
export class JavaService {

    /**
     * Gets the AstNode of Node
     * @param node // AST Node
     */
    static getAstNode(node): AstNodeInterface{
        let astNode: AstNodeInterface = {
            end: node.location.endOffset,
            kind: node.name,
            name: node.name,
            pos: node.location.startOffset,
            start: node.location.startOffset
        }
        return astNode;
    }

    /**
     * @param  {Infos} infos
     * @param  {AstNodeInterface} astNode
     * @returns AstNodeInterface
     */
    static getAstNodeInfos(infos: Infos[], astNode: AstNodeInterface): AstNodeInterface {
        if(infos) {
            infos.forEach(info => {
                let childrenAstNode: AstNodeInterface = {
                    end: info.endOffset,
                    kind: info.image,
                    name: info.image,
                    pos: info.startOffset,
                    start: info.startOffset
                }
                astNode.children.push(childrenAstNode);
            });
        }
        return astNode;
    }

    /**
     * Gets astNode with children
     * @param node // AST Node
     */
    static getAstNodeWithChildren(node): AstNodeInterface{
        let astNode: AstNodeInterface = {
            end: node.location.endOffset,
            kind: node.name,
            name: node.name,
            pos: node.location.startOffset,
            start: node.location.startOffset
        }
        astNode.children = [];

        return astNode;
    }
    
    /**
     * @param  {Annotation[]} annotations
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstAnnotation(annotations: Annotation[], annotationAstNode: AstNodeInterface): AstNodeInterface {
        annotations.forEach(annotation => {
            let astNode = JavaService.getAstNodeWithChildren(annotation);
            JavaService.generateAstAnnotationChildren(annotation.children, astNode);
            annotationAstNode.children.push(astNode);
        })
        return annotationAstNode;
    }

    /**
     * @param  {AnnotationChildren} annotationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    static generateAstAnnotationChildren(annotationChildren: AnnotationChildren, astNode: AstNodeInterface): void {
        if(annotationChildren) {
            JavaService.getAstNodeInfos(annotationChildren.at, astNode);
            JavaService.getAstNodeInfos(annotationChildren.typeName, astNode);
        } 
    }

    /**
     * @param  {TypeIdentifier[]} typeIdentifierList
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeIdentifier(_typeIdentifierList: TypeIdentifier[], annotationAstNode: AstNodeInterface): AstNodeInterface {
        return annotationAstNode;
    }

}