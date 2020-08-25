import { GeneseMapper } from 'genese-mapper';
import { compilationUnit, ordinaryCompilationUnit, packageDeclaration, importDeclaration, packageOrTypeName } from '../models/Node';
import { SyntaxKind } from '../core/syntax-kind.enum';

export class GeneseMapperService{

    static getMappedCompilationUnit(node): compilationUnit {
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(compilationUnit); 
        const compilationGeneseMapper = new GeneseMapper(ordinaryCompilationUnit); 

        const mappedCompilationUnit: compilationUnit = nodeGeneseMapper.map(node);
        if(mappedCompilationUnit.name === SyntaxKind.compilationUnit && mappedCompilationUnit.location){
            const oCompilationUnit: ordinaryCompilationUnit[] = compilationGeneseMapper.arrayMap(node.children.ordinaryCompilationUnit);
            mappedCompilationUnit.children.ordinaryCompilationUnit = oCompilationUnit;
        }

        return mappedCompilationUnit;
    }

    static getMappedPackage(node): packageDeclaration{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(packageDeclaration);
        const packageObject: packageDeclaration = nodeGeneseMapper.map(node);

        return packageObject;
    }

    static getMappedImports(node): importDeclaration[]{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(importDeclaration);
        const importsObject: importDeclaration[] = nodeGeneseMapper.arrayMap(node);

        return importsObject;
    }

    static getMappedImport(node): importDeclaration{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(importDeclaration);
        const importObject: importDeclaration = nodeGeneseMapper.map(node);

        return importObject;
    }

    static getMappedPackageOrTypeName(node): packageOrTypeName{
        //Mapper declaration
        const nodeGeneseMapper = new GeneseMapper(packageOrTypeName);
        const packageOrTypeNameObject: packageOrTypeName = nodeGeneseMapper.map(node);

        return packageOrTypeNameObject;
    }

}