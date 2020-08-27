import { GeneseMapper } from 'genese-mapper';
import { CompilationUnit, OrdinaryCompilationUnit } from '../models/CompilationUnit';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { PackageDeclaration } from '../models/PackageDeclaration';
import { ImportDeclaration, PackageOrTypeName } from '../models/ImportDeclaration';

export class GeneseMapperService{

    static getMappedCompilationUnit(node): CompilationUnit {
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(CompilationUnit); 
        const compilationGeneseMapper = new GeneseMapper(OrdinaryCompilationUnit); 

        const mappedCompilationUnit: CompilationUnit = nodeGeneseMapper.map(node);
        if(mappedCompilationUnit.name === SyntaxKind.compilationUnit && mappedCompilationUnit.location){
            const oCompilationUnit: OrdinaryCompilationUnit[] = compilationGeneseMapper.arrayMap(node.children.ordinaryCompilationUnit);
            mappedCompilationUnit.children.ordinaryCompilationUnit = oCompilationUnit;
        }

        return mappedCompilationUnit;
    }

    static getMappedPackage(node): PackageDeclaration{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(PackageDeclaration);
        const packageObject: PackageDeclaration = nodeGeneseMapper.map(node);

        return packageObject;
    }

    static getMappedImports(node): ImportDeclaration[]{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(ImportDeclaration);
        const importsObject: ImportDeclaration[] = nodeGeneseMapper.arrayMap(node);

        return importsObject;
    }

    static getMappedImport(node): ImportDeclaration{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(ImportDeclaration);
        const importObject: ImportDeclaration = nodeGeneseMapper.map(node);

        return importObject;
    }

    static getMappedPackageOrTypeName(node): PackageOrTypeName{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(PackageOrTypeName);
        const packageOrTypeNameObject: PackageOrTypeName = nodeGeneseMapper.map(node);

        return packageOrTypeNameObject;
    }

}