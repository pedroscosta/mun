import { CstParser } from "chevrotain";
import { AllTokens } from "../lexer";
import { Colon, Equals, Identifier, Integer, Semicolon } from "../lexer/tokens";

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
    this.SUBRULE(this.variableIdentifier);
    this.CONSUME2(Equals);
    this.CONSUME3(Integer);
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
