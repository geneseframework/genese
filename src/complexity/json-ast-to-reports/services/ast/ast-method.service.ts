import { AstMethod } from '../../models/ast/ast-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { AstNode } from '../../models/ast/ast-node.model';
import { CodeLine } from '../../models/code/code-line.model';

export class AstMethodService {


    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given astMethod
     * @param cpxByStatus   // The object to add
     * @param astMethod    // The AstMethod in question
     */
    addMethodCpxByStatus(cpxByStatus: ComplexitiesByStatus, astMethod: AstMethod): ComplexitiesByStatus {
        let cpx: ComplexitiesByStatus = cpxByStatus ?? new ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.COGNITIVE, astMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.CYCLOMATIC, astMethod.cyclomaticStatus);
        return cpx;
    }


    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given MethodStatus
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param methodStatus      // The complexity status
     */
    private incrementMethodByCpxType(cpxByStatus: ComplexitiesByStatus, complexityType: ComplexityType, methodStatus: MethodStatus): ComplexitiesByStatus {
        const status: ComplexitiesByStatus = cpxByStatus;
        switch (methodStatus) {
            case MethodStatus.CORRECT:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case MethodStatus.WARNING:
                status[complexityType].warning++;
                break;
            case MethodStatus.ERROR:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    }


    static getCodeLines(astMethodNode: AstNode): CodeLine[] {
        if (!astMethodNode?.astFile?.code?.lines?.length || astMethodNode.astFile.code.lines.length < 2) {
            return [];
        }
        let firstLine: CodeLine = astMethodNode.astFile.code.lines.slice(astMethodNode.linePos - 1)[0];
        console.log('GET CODE LINNN', astMethodNode.kind, astMethodNode.pos, firstLine, '|');
        let codeLines = astMethodNode.astFile.code.lines.slice(astMethodNode.linePos - 1, astMethodNode.lineEnd);
        return codeLines;
    }

}
