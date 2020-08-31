import { SyntaxKind } from '../core/syntax-kind.enum';
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
     * Gets the lCurly Node
     * @param lCurly // AST Node
     */
    static getLCurly(lCurly, lCurlyAstNode): AstNodeInterface{
        let astNode = this.getAstNode(lCurly[0]);
        astNode.kind = SyntaxKind.LCurly;
        
        lCurlyAstNode.children.push(astNode);

        return lCurlyAstNode;
    }

    /**
     * Gets the rCurly Node
     * @param rCurly // AST Node
     */
    static getRCurly(rCurly, rCurlyAstNode): AstNodeInterface{
        let astNode = this.getAstNode(rCurly[0]);
        astNode.kind = SyntaxKind.RCurly;

        rCurlyAstNode.children.push(astNode);

        return rCurlyAstNode;
    }

    /**
     * Gets the identifier Node List
     * @param node // AST Node
     */
    static getIdentifier(node, identifierAstNode): AstNodeInterface[]{
        node.forEach(identifier =>{
            let astNode = this.getAstNode(identifier);
            astNode.kind = SyntaxKind.Identifier;
            identifierAstNode.children.push(astNode);
        });
        
        return identifierAstNode;
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
    static generateAstTypeIdentifier(typeIdentifierList: TypeIdentifier[], annotationAstNode: AstNodeInterface): AstNodeInterface {
        typeIdentifierList.forEach(typeIdentifier => {
            let astNode = JavaService.getAstNodeWithChildren(typeIdentifier);
            if(typeIdentifier.children?.Identifier) {
                JavaService.getAstNodeInfos(typeIdentifier.children.Identifier, astNode);
            }
            annotationAstNode.children.push(astNode);
        });
        return annotationAstNode;
    }

    /**
     * Gets the At Node
     * @param atNode // AST Node
     */
    static getAtNode(node): AstNodeInterface{
        let astNode = this.getAstNode(node[0]);
        astNode.kind = SyntaxKind.At;

        return astNode;
    }

    /**
     * Gets the typeNameNode Node
     * @param typeNameNode // AST Node
     */
    static getTypeNameNode(typeNameNode): AstNodeInterface{
        let astNode = this.getAstNodeWithChildren(typeNameNode[0]);
        astNode.kind = SyntaxKind.typeName;

        //Identifier
        if(typeNameNode[0].children.Identifier) {
            this.getIdentifier(typeNameNode[0].children.Identifier, astNode);
        }
        
        return astNode;
    }

    

    /**
     * 
     * @param lBrace 
     */
    static getLBrace(lBrace, lBraceAstNode): AstNodeInterface{
        let astNode = this.getAstNode(lBrace[0]);
        astNode.kind = SyntaxKind.LBrace;

        lBraceAstNode.children.push(astNode);

        return lBraceAstNode;
    }

    /**
     * 
     * @param rBrace 
     */
    static getRBrace(rBrace, rBraceAstNode): AstNodeInterface{
        let astNode = this.getAstNode(rBrace[0]);
        astNode.kind = SyntaxKind.RBrace;

        rBraceAstNode.children.push(astNode);

        return rBraceAstNode;
    }
    
    /**
     * 
     * @param semicolon 
     * @param semicolonAstNode 
     */
    static getSemicolon(semicolon, semicolonAstNode): AstNodeInterface{
        let astNode = this.getAstNode(semicolon[0]);
        astNode.kind = SyntaxKind.semiColon;

        semicolonAstNode.children.push(astNode);

        return semicolonAstNode;
    }

    /**
     * 
     * @param importNode 
     * @param getImportAstNode 
     */
    static getImport(importNode, importAstNode): AstNodeInterface{
        let astNode = this.getAstNode(importNode[0]);
        astNode.kind = SyntaxKind.import;

        importAstNode.children.push(astNode);

        return importAstNode;
    }

    /**
     * 
     * @param node 
     * @param modificatorAstNode 
     */
    static getModificator(node, modificatorAstNode): AstNodeInterface{
        modificatorAstNode.children.push(this.getAstNode(node));

        return modificatorAstNode;
    }
}