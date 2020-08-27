import { CompilationUnitChildren, OrdinaryCompilationUnitChildren } from './CompilationUnit';
import { Infos } from './Infos';
import { PackageDeclarationChildren, PackageDeclaration } from './PackageDeclaration';
import { ImportDeclaration, ImportChildren, PackageOrTypeName, PackageOrTypeNameChildren } from './ImportDeclaration';
import { ClassDeclaration, ClassDeclarationChildren, ClassModifier, NormalClassDeclaration, ClassModifierChildren, Annotation, AnnotationChildren, TypeDeclaration, TypeDeclarationChildren, NormalClassDeclarationChildren } from './TypeDeclaration';

/**
 * Service contains common functions
 */
export class Utils {

    static initInfo(): Infos[]{
        return [{
            image:'',
            startOffset: 0,
            endOffset: 0,
            startLine: 0,
            endLine: 0,
            startColumn: 0,
            endColumn: 0,
            tokenTypeIdx: 0,
        }];
    }

    static initLocation(): any{
        return {
            startOffset: 0,
            startLine: 0,
            startColumn: 0,
            endOffset: 0,
            endLine: 0,
            endColumn: 0,
        };
    }

    //CompilationUnit
    static initCompilationUnitChildren(): CompilationUnitChildren{
        let children = new CompilationUnitChildren();
        children.ordinaryCompilationUnit = [];
        children.EOF = this.initInfo();
        return children;
    }

    static initOrdinaryCompilationUnitChildren(): OrdinaryCompilationUnitChildren{
        let children = new OrdinaryCompilationUnitChildren();
        children.packageDeclaration = this.initPackageDeclaration();
        children.importDeclaration = this.initImportDeclaration();
        children.typeDeclaration = this.initTypeDeclaration();
        return children;
    }

    //Package
    static initPackageDeclaration(): PackageDeclaration[] {
        return [{
            packageDeclaration: [],
            name: '',
            children: this.initPackageDeclarationChildren(),
            location: this.initLocation(),
        }]
    }

    static initPackageDeclarationChildren(): PackageDeclarationChildren{
        let children = new PackageDeclarationChildren();
        children.Package = this.initInfo();
        children.Identifier = this.initInfo();
        children.Dot = this.initInfo();
        children.Semicolon = this.initInfo();
        return children;
    }

    //Import
    static initImportDeclaration(): ImportDeclaration[] {
        return [{
            importDeclaration: [],
            name: '',
            children: this.initImportChildren(),
            location: this.initLocation(),
        }]
    }

    static initImportChildren(): ImportChildren{
        let children = new ImportChildren();
        children.Import = this.initInfo();
        children.packageOrTypeName = this.initPackageOrTypeName();
        children.Semicolon = this.initInfo();
        return children;
    }

    //TypeDeclaration
    static initTypeDeclaration(): TypeDeclaration[]{
        return [{
            typeDeclaration: [],
            name: '',
            children: this.initTypeDeclarationChildren(),
            location: this.initLocation(),
        }]
    }

    //PackageOrTypeName
    static initPackageOrTypeName(): PackageOrTypeName[]{
        return [{
            name:'',
            children: this.initPackageOrTypeNameChildren(),
            location: Utils.initLocation(),
        }]
    }

    static initPackageOrTypeNameChildren(): PackageOrTypeNameChildren{
        let children = new PackageOrTypeNameChildren();
        children.Identifier = this.initInfo();
        children.Dot = this.initInfo();
        return children;
    }

    static initTypeDeclarationChildren(): TypeDeclarationChildren{
        let children = new TypeDeclarationChildren();
        children.classDeclaration = [];
        return children;
    }

    static into():ClassDeclaration{
        return {
            classDeclaration: [],
            name:'',
            children: this.initClassDeclarationChildren(),
            location: this.initLocation(),
        }
    }

    //ClassDeclaration
    static initClassDeclaration(): ClassDeclaration[]{
        return [{
            classDeclaration: [],
            name:'',
            children: this.initClassDeclarationChildren(),
            location: this.initLocation(),
        }]
    }

    static initClassDeclarationChildren(): ClassDeclarationChildren{
        let children = new ClassDeclarationChildren();
        children.classModifier = this.initClassModifier();
        children.normalClassDeclaration = this.initNormalClassDeclaration();
        return children;
    }

    //ClassModifier
    static initClassModifier(): ClassModifier[]{
        return [{
            classModifier: [],
            name:'',
            children: this.initClassModifierChildren(),
            location: this.initLocation(),
        }]
    }

    static initClassModifierChildren(): ClassModifierChildren{
        let classModifierChildren = new ClassModifierChildren();
        classModifierChildren.annotation = this.initAnnotation();
        classModifierChildren.Public = this.initInfo();
        return classModifierChildren;
    }

    //Annotation
    static initAnnotation(): Annotation[]{
        return [{
            annotation: [],
            name:'',
            children: this.intAnnotationChildren(),
            location: this.initLocation(),
        }];
    }

    static intAnnotationChildren(): AnnotationChildren[]{
        return [{
            at: this.initInfo(),
            typeName: this.initInfo(),
        }];
    }

    //NormalClassDeclaration
    static initNormalClassDeclaration(): NormalClassDeclaration[]{

        return [{
            name:'',
            children: this.initNormalClassDeclarationChildren(),
            location: this.initLocation(),
        }]
    }

    static initNormalClassDeclarationChildren(): NormalClassDeclarationChildren{
        let children = new NormalClassDeclarationChildren();
        children.Class = this.initInfo();
        children.typeIdentifier = this.initInfo();
        children.classBody = this.initInfo();
        return children;
    }
}