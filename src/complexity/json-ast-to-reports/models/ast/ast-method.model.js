"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _astNode, _codeLines, _cognitiveStatus, _cpxFactors, _cyclomaticCpx, _cpxIndex, _cyclomaticStatus, _displayedCode, _maxLineLength, _name;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstMethod = void 0;
const cyclomatic_cpx_service_1 = require("../../services/cyclomatic-cpx.service");
const code_model_1 = require("../code/code.model");
const ast_service_1 = require("../../services/ast/ast.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const code_line_model_1 = require("../code/code-line.model");
const cpx_factors_1 = require("../../../core/const/cpx-factors");
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const log_service_1 = require("../../services/log.service");
const options_model_1 = require("../../../core/models/options.model");
/**
 * Element of the AstNode structure corresponding to a given method
 */
class AstMethod {
    constructor() {
        _astNode.set(this, undefined); // The AST of the method itself
        _codeLines.set(this, []);
        _cognitiveStatus.set(this, evaluation_status_enum_1.MethodStatus.CORRECT); // The cognitive status of the method
        _cpxFactors.set(this, undefined); // The complexity factors of the AstMethod
        _cyclomaticCpx.set(this, 0); // The cyclomatic complexity of the AstMethod
        _cpxIndex.set(this, undefined); // The complexity index of the method
        _cyclomaticStatus.set(this, evaluation_status_enum_1.MethodStatus.CORRECT); // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        _maxLineLength.set(this, 0); // The max length of the lines of the code
        _name.set(this, undefined); // The name of the method
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astNode() {
        return __classPrivateFieldGet(this, _astNode);
    }
    set astNode(astNode) {
        __classPrivateFieldSet(this, _astNode, astNode);
    }
    get codeLines() {
        return __classPrivateFieldGet(this, _codeLines);
    }
    set codeLines(codeLines) {
        __classPrivateFieldSet(this, _codeLines, codeLines);
    }
    get cognitiveStatus() {
        return __classPrivateFieldGet(this, _cognitiveStatus);
    }
    set cognitiveStatus(cognitiveStatus) {
        __classPrivateFieldSet(this, _cognitiveStatus, cognitiveStatus);
    }
    get cpxFactors() {
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get cpxIndex() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxIndex)) !== null && _a !== void 0 ? _a : this.cpxFactors.total;
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    get cyclomaticStatus() {
        return __classPrivateFieldGet(this, _cyclomaticStatus);
    }
    set cyclomaticStatus(cyclomaticStatus) {
        __classPrivateFieldSet(this, _cyclomaticStatus, cyclomaticStatus);
    }
    get displayedCode() {
        return __classPrivateFieldGet(this, _displayedCode);
    }
    get maxLineLength() {
        var _a;
        if (__classPrivateFieldGet(this, _maxLineLength)) {
            return __classPrivateFieldGet(this, _maxLineLength);
        }
        __classPrivateFieldSet(this, _maxLineLength, Math.max(...(_a = this.codeLines) === null || _a === void 0 ? void 0 : _a.map(l => l.end - l.start)));
        return __classPrivateFieldGet(this, _maxLineLength);
    }
    get name() {
        if (__classPrivateFieldGet(this, _name)) {
            return __classPrivateFieldGet(this, _name);
        }
        __classPrivateFieldSet(this, _name, __classPrivateFieldGet(this, _astNode).name);
        return __classPrivateFieldGet(this, _name);
    }
    get position() {
        var _a;
        return (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.pos;
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Creates the displayed code of this AstMethod and evaluates its complexity
     */
    evaluate() {
        this.createDisplayedCode();
        log_service_1.LogService.logMethod(this, true);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticCpx = cyclomatic_cpx_service_1.CyclomaticCpxService.calculateCyclomaticCpx(this.astNode);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    }
    /**
     * Calculates the Complexity Factors of the method
     */
    calculateCpxFactors() {
        var _a, _b, _c;
        if (!(((_b = (_a = __classPrivateFieldGet(this, _displayedCode)) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
            this.createDisplayedCode();
        }
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        for (const line of (_c = __classPrivateFieldGet(this, _displayedCode)) === null || _c === void 0 ? void 0 : _c.lines) {
            this.cpxFactors = this.cpxFactors.add(line.cpxFactors);
        }
    }
    /**
     * Gets the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType) {
        let status = evaluation_status_enum_1.MethodStatus.WARNING;
        if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex <= options_model_1.Options.cognitiveCpx.warningThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= options_model_1.Options.cyclomaticCpx.warningThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.CORRECT;
        }
        else if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex > options_model_1.Options.cognitiveCpx.errorThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx > options_model_1.Options.cyclomaticCpx.errorThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.ERROR;
        }
        return status;
    }
    /**
     * Creates the method's code to display, with comments
     * @param astNode  // The AstNode to analyse (by default: the AstNode associated to this AstMethod)
     */
    createDisplayedCode(astNode = this.astNode) {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(astNode, false);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxFactors();
        __classPrivateFieldGet(this, _displayedCode).setTextWithLines();
    }
    /**
     * Creates the Code object corresponding to the code to display
     */
    setDisplayedCodeLines() {
        __classPrivateFieldSet(this, _displayedCode, new code_model_1.Code());
        for (const line of this.codeLines) {
            const displayedLine = new code_line_model_1.CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.text = line.text;
            displayedLine.end = line.end;
            displayedLine.start = line.start;
            __classPrivateFieldGet(this, _displayedCode).lines.push(displayedLine);
        }
    }
    /**
     * Calculates the complexity factors of each CodeLine
     * @param astNode                   // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    setCpxFactorsToDisplayedCode(astNode, startedUncommentedLines = false) {
        var _a;
        for (const childAst of astNode.children) {
            let issue = Math.max(childAst.lineStart, (_a = this.codeLines[0]) === null || _a === void 0 ? void 0 : _a.issue);
            // console.log(chalk.blueBright('CHILD ASTTTT'), childAst.kind, childAst.start, childAst.lineStart, this.position, chalk.redBright('ISSUE', issue))
            const codeLine = __classPrivateFieldGet(this, _displayedCode).lines.find(l => l.issue === issue);
            if (ast_service_1.Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.atomic.node = cpx_factors_1.cpxFactors.atomic.node;
                issue--;
            }
            this.increaseLineCpxFactors(childAst, codeLine);
            __classPrivateFieldGet(this, _displayedCode).getLine(issue).astNodes.push(childAst);
            this.setCpxFactorsToDisplayedCode(childAst, startedUncommentedLines);
        }
    }
    /**
     * Adds the Complexity of a AstNode to its CodeLine
     * @param astNode      // The AstNode inside the line of code
     * @param codeLine      // The CodeLine containing the AstNode
     */
    increaseLineCpxFactors(astNode, codeLine) {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(astNode === null || astNode === void 0 ? void 0 : astNode.cpxFactors);
        }
    }
    /**
     * Adds information about complexity factors for each line of the displayed code
     */
    addCommentsToDisplayedCode() {
        __classPrivateFieldGet(this, _displayedCode).lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
            let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalAtomic.toFixed(1)} ${factor_category_enum_1.FactorCategory.ATOMIC}`;
            comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${factor_category_enum_1.FactorCategory.AGGREGATION}` : comment;
            comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
            comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
            comment = line.cpxFactors.totalRecursion > 0 ? `${comment}, +${line.cpxFactors.totalRecursion} recursivity` : comment;
            comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${factor_category_enum_1.FactorCategory.STRUCTURAL}` : comment;
            comment = `${comment})`;
            __classPrivateFieldGet(this, _displayedCode).getLine(line.issue).addComment(comment, this.maxLineLength);
        });
    }
}
exports.AstMethod = AstMethod;
_astNode = new WeakMap(), _codeLines = new WeakMap(), _cognitiveStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _cpxIndex = new WeakMap(), _cyclomaticStatus = new WeakMap(), _displayedCode = new WeakMap(), _maxLineLength = new WeakMap(), _name = new WeakMap();
