"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cpxIndex, _displayedCode, _originalCode;
Object.defineProperty(exports, "__esModule", { value: true });
const tree_file_model_1 = require("./tree-file.model");
const ast_service_1 = require("../../services/ast.service");
const cyclomaticComplexityService_1 = require("../../services/cyclomaticComplexityService");
const options_1 = require("../options");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const evaluable_model_1 = require("../evaluable.model");
const code_model_1 = require("../code/code.model");
const code_service_1 = require("../../services/code.service");
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const code_line_model_1 = require("../code/code-line.model");
const cpx_factors_1 = require("../../cpx-factors");
const log_service_1 = require("../../services/tree/log.service");
/**
 * Element of the TreeNode structure corresponding to a given method
 */
class TreeMethod extends evaluable_model_1.Evaluable {
    constructor(node) {
        super();
        this.astPosition = 0; // The position of the AST node of the method in the code of its file
        this.codeService = new code_service_1.CodeService(); // The service managing Code objects
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cognitive status of the method
        _cpxIndex.set(this, undefined);
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        this.filename = ''; // The name of the file containing the method
        this.name = ''; // The name of the method
        this.node = undefined; // The AST node corresponding to the method
        _originalCode.set(this, undefined); // The original Code of the method (as Code object)
        this.treeFile = new tree_file_model_1.TreeFile(); // The TreeFile which contains the TreeMethod
        this.treeNode = undefined; // The AST of the method itself
        this.node = node;
        this.name = ast_service_1.Ast.getMethodName(node);
    }
    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate() {
        var _a, _b, _c;
        log_service_1.LogService.printAllChildren(this.treeNode);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticCpx = cyclomaticComplexityService_1.CyclomaticComplexityService.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.filename = (_c = (_b = (_a = this.treeFile) === null || _a === void 0 ? void 0 : _a.sourceFile) === null || _b === void 0 ? void 0 : _b.fileName) !== null && _c !== void 0 ? _c : '';
        console.log('METHOD PARAMSSS', this.treeNode.params);
    }
    /**
     * Get the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType) {
        let status = evaluation_status_enum_1.MethodStatus.WARNING;
        if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex <= options_1.Options.cognitiveCpx.warningThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= options_1.Options.cyclomaticCpx.warningThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.CORRECT;
        }
        else if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex > options_1.Options.cognitiveCpx.errorThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx > options_1.Options.cyclomaticCpx.errorThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.ERROR;
        }
        return status;
    }
    /**
     * Gets the full originalText of the method
     */
    set originalCode(code) {
        __classPrivateFieldSet(this, _originalCode, code);
    }
    /**
     * Gets the full originalText of the method
     */
    get displayedCode() {
        return __classPrivateFieldGet(this, _displayedCode);
    }
    get cpxIndex() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxIndex)) !== null && _a !== void 0 ? _a : this.calculateCpxIndex();
    }
    calculateCpxIndex() {
        var _a, _b, _c;
        if (!(((_b = (_a = __classPrivateFieldGet(this, _displayedCode)) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
            this.createDisplayedCode();
        }
        let count = 0;
        for (const line of (_c = __classPrivateFieldGet(this, _displayedCode)) === null || _c === void 0 ? void 0 : _c.lines) {
            count += line.cpxFactors.total;
        }
        return +count.toFixed(2);
    }
    /**
     * Creates the code to display with the original code of a TreeNode
     * @param tree  // The TreeNode to analyse
     */
    createDisplayedCode(tree = this.treeNode) {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(tree);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
        __classPrivateFieldGet(this, _displayedCode).setTextWithLines();
    }
    setDisplayedCodeLines() {
        __classPrivateFieldSet(this, _displayedCode, new code_model_1.Code());
        for (const line of __classPrivateFieldGet(this, _originalCode).lines) {
            const displayedLine = new code_line_model_1.CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.text = line.text;
            displayedLine.position = line.position;
            __classPrivateFieldGet(this, _displayedCode).lines.push(displayedLine);
        }
    }
    /**
     * Sets the CodeLines of the displayed Code of this method
     * @param tree
     */
    setCpxFactorsToDisplayedCode(tree) {
        var _a;
        for (const childTree of tree.children) {
            let issue = this.codeService.getLineIssue(__classPrivateFieldGet(this, _originalCode), ((_a = childTree.node) === null || _a === void 0 ? void 0 : _a.pos) - this.astPosition);
            if (ast_service_1.Ast.isElseStatement(childTree.node)) {
                childTree.cpxFactors.basic.node = cpx_factors_1.cpxFactors.basic.node;
                issue--;
            }
            __classPrivateFieldGet(this, _displayedCode).lines[issue].cpxFactors = __classPrivateFieldGet(this, _displayedCode).lines[issue].cpxFactors.add(childTree.cpxFactors);
            __classPrivateFieldGet(this, _displayedCode).lines[issue].treeNodes.push(childTree);
            this.setCpxFactorsToDisplayedCode(childTree);
        }
    }
    /**
     * Adds information about complexity increment reasons for each line of the displayed code
     */
    addCommentsToDisplayedCode() {
        __classPrivateFieldGet(this, _displayedCode).lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
            let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalBasic.toFixed(1)} ${factor_category_enum_1.FactorCategory.BASIC}`;
            comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${factor_category_enum_1.FactorCategory.AGGREGATION}` : comment;
            comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
            comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
            comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${factor_category_enum_1.FactorCategory.STRUCTURAL}` : comment;
            comment = `${comment})`;
            __classPrivateFieldGet(this, _displayedCode).lines[line.issue - 1].text = __classPrivateFieldGet(this, _originalCode).addComment(comment, __classPrivateFieldGet(this, _originalCode).lines[line.issue - 1]);
        });
    }
}
exports.TreeMethod = TreeMethod;
_cpxIndex = new WeakMap(), _displayedCode = new WeakMap(), _originalCode = new WeakMap();
