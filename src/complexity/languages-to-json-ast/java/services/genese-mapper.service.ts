import { GeneseMapper } from 'genese-mapper';
import { CompilationUnit } from '../models/CompilationUnit';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { OrdinaryCompilationUnit } from '../models/OrdinaryCompilationUnit';

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

}