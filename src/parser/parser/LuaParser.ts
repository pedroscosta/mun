import { CstParser } from "chevrotain";
import { AllTokens } from "../lexer";
import {
  BinaryOperator,
  Colon,
  Comma,
  Equals,
  Identifier,
  LParen,
  NumberLiteral,
  RParen,
  Semicolon,
} from "../lexer/tokens";

export default class LuaParser extends CstParser {
  constructor() {
    super(AllTokens);
    this.performSelfAnalysis();
  }

  public block = this.RULE("block", () => {
    this.MANY(() => {
      this.SUBRULE(this.statement);
      // TODO Add retStat
    });
  });

  public statement = this.RULE("statement", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(Semicolon);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.variableDeclaration);
        },
      },
    ]);
  });

  public variableIdentifier = this.RULE("variableIdentifier", () => {
    this.CONSUME(Identifier);
    this.OPTION(() => {
      this.CONSUME1(Colon);
      this.CONSUME2(Identifier);
    });
  });

  public variableDeclaration = this.RULE("variableDeclaration", () => {
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.variableIdentifier);
      },
    });
    this.CONSUME(Equals);
    this.AT_LEAST_ONE_SEP2({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.expression);
      },
    });
  });

  public expression = this.RULE("expression", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.binaryOperation);
        },
      },
    ]);
  });

  public binaryOperation = this.RULE("binaryOperation", () => {
    this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(BinaryOperator);
      this.SUBRULE(this.expression, { LABEL: "rhs" });
    });
  });

  public atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
      { ALT: () => this.CONSUME(NumberLiteral) },
    ]);
  });

  public parenthesisExpression = this.RULE("parenthesisExpression", () => {
    this.CONSUME(LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(RParen);
  });

  // public localVariableDeclaration = this.RULE(
  //   "localVariableDeclaration",
  //   () => {
  //     this.OPTION(() => {
  //       this.CONSUME(LocalKeyword);
  //     });
  //     this.CONSUME(Identifier);
  //     this.OPTION2(() => {
  //       this.CONSUME(Equals);
  //       this.CONSUME2(Integer);
  //     });
  //   }
  // );
}
