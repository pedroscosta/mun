import { CstNode } from 'chevrotain';
import { BaseLuaVisitor } from '../parser/parser';
import {
  AtomicExpressionCtx,
  BinaryOperationCtx,
  BinaryOperationNode,
  DeclarationNode,
  ExpressionCtx,
  ExpressionNode,
  IdentifierNode,
  PrintableNode,
  VariableDeclarationCtx,
  VariableIdentifierCtx,
} from './types';
import { defaultTypes } from './typings';
import { assertTypeMatch } from './typings/utils';
import { isNodeEmpty } from './utils/nodeUtils';

type CstContext = CstNode | CstNode[];

export class MunBlockVisitor extends BaseLuaVisitor {
  private fileBuffer: string[][];
  private types: typeof defaultTypes;

  constructor(types = defaultTypes) {
    super();
    // The "validateVisitor" method is a helper utility which performs static analysis
    // to detect missing or redundant visitor methods
    this.validateVisitor();
    this.fileBuffer = [];
    this.types = types;
  }

  public appendLineToFileBuffer(...lines: string[][]) {
    this.fileBuffer.push(...lines);
  }

  public getFileBuffer() {
    return this.fileBuffer;
  }

  public visit(ctx: CstContext | undefined): PrintableNode {
    if (ctx === undefined) return { output: [] };

    const visited = super.visit(ctx);

    console.log(Array.isArray(ctx) ? ctx[0].name : ctx.name, visited);

    return visited;
  }

  // TODO: Is this really necessary? Expressions can be written without being an explicit expression?
  private visitExpression(ctx: CstContext | undefined): ExpressionNode {
    return this.visit(ctx) as ExpressionNode;
  }

  ///////////////////////// Block

  public block(ctx: any) {
    ctx.statement?.map((statement) => {
      const evaluatedStatement = this.visit(statement) as DeclarationNode;

      this.appendLineToFileBuffer([
        '-- evaluated types:',
        Object.entries(evaluatedStatement.declaredVars)
          .map(([k, v]) => k + ': ' + v.type.name)
          .join(', '),
      ]);

      this.appendLineToFileBuffer(evaluatedStatement.output);
    });
  }

  ///////////////////////// Statement

  public statement(ctx: any): DeclarationNode {
    return this.visit(ctx.variableDeclaration) as DeclarationNode;
  }

  ///////////////////////// Variables

  public variableIdentifier(ctx: VariableIdentifierCtx): IdentifierNode {
    return {
      output: [ctx.Identifier[0].image],
      type: this.types[ctx.Identifier[1]?.image] ?? this.types.any,
    };
  }

  public variableDeclaration(ctx: VariableDeclarationCtx): DeclarationNode {
    const declaredVars: DeclarationNode['declaredVars'] = {};

    let output: string[] = ['='];
    let amt = 0;

    const identifiers = ctx.variableIdentifier.map((idtf) => this.visit(idtf) as IdentifierNode);

    identifiers.map((idtf, i) => {
      const varName = idtf.output[0];

      const varValue = this.visitExpression(ctx.expression[i]);

      if (!isNodeEmpty(varValue)) {
        if (amt > 0) output.push(',');
        output.push(varValue.output[0]);

        assertTypeMatch(idtf.type, varValue.type);
      }

      declaredVars[varName] = {
        type: !this.types.any.equals(idtf.type) ? idtf.type : varValue?.type ?? this.types.any,
      };

      const identifierSlice = amt > 0 ? [',', varName] : [varName];
      output = [...output.slice(0, amt), ...identifierSlice, ...output.slice(amt)];

      amt++;
    });

    return { declaredVars, output };
  }

  public expression(ctx: ExpressionCtx): ExpressionNode {
    if (ctx.binaryOperation !== undefined) {
      const binaryOperation = this.binaryOperation(ctx.binaryOperation[0].children);

      if (binaryOperation.operator === undefined) return binaryOperation.lhs;
    }

    return { output: [], type: this.types.any };
  }

  public binaryOperation(ctx: BinaryOperationCtx): BinaryOperationNode {
    const lhs = this.visitExpression(ctx.lhs);
    const operator = ctx.BinaryOperator?.[0]?.image;
    const rhs = this.visitExpression(ctx.rhs); // TODO: Map children

    return {
      lhs,
      operator,
      rhs,
    };
  }

  public atomicExpression(ctx: AtomicExpressionCtx): ExpressionNode {
    if (ctx.NumberLiteral !== undefined) {
      const numberLiteral = ctx.NumberLiteral;

      return { output: [numberLiteral[0].image.toString()], type: this.types.number };
    }

    return { output: [], type: this.types.any };
  }

  public parenthesisExpression(ctx: any) {}
}
