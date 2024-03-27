import { CstNode, IToken } from 'chevrotain';
import MunType from './typings/MunType';

export type TypedNode = {
  type: MunType;
};

export type PrintableNode = {
  output: string[];
};

export type ExpressionNode = PrintableNode & TypedNode;

export type BinaryOperationNode = {
  lhs: ExpressionNode;
  operator?: string;
  rhs?: ExpressionNode;
};

export type IdentifierNode = PrintableNode & TypedNode;

export type DeclarationNode = PrintableNode & {
  declaredVars: Record<string, TypedNode>;
};

export type VariableIdentifierCtx = {
  Identifier: IToken[];
  Colon: IToken[];
};

export type VariableIdentifierCstNode = CstNode & {
  name: 'variableIdentifier';
  children: VariableIdentifierCtx;
};

export type VariableDeclarationCtx = {
  variableIdentifier: VariableIdentifierCstNode[];
  expression: ExpressionCstNode[];
  Equals: IToken[];
};

export type VariableDeclarationCstNode = CstNode & {
  name: 'variableDeclaration';
  children: VariableIdentifierCtx;
};

export type ParenthesisExpressionCtx = {
  LParen: IToken[];
  expression: ExpressionCstNode[];
  RParen: IToken[];
};

export type ParenthesisExpressionCstNode = CstNode & {
  name: 'parenthesisExpression';
  children: ParenthesisExpressionCtx;
};

export type ExpressionCtx = {
  binaryOperation?: BinaryOperationCstNode[];
};

export type ExpressionCstNode = CstNode & {
  name: 'expression';
  children: ExpressionCtx;
};

export type AtomicExpressionCtx = {
  parenthesisExpression?: ParenthesisExpressionCstNode[];
  NumberLiteral?: IToken[];
};

export type AtomicExpressionCstNode = CstNode & {
  name: 'atomicExpression';
  children: AtomicExpressionCtx;
};

export type BinaryOperationCtx = {
  lhs: AtomicExpressionCstNode[];
  BinaryOperator?: IToken[];
  rhs?: ExpressionCstNode[];
};

export type BinaryOperationCstNode = CstNode & {
  name: 'binaryOperator';
  children: BinaryOperationCtx;
};
