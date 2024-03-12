import { CstNode } from "chevrotain";
import { BaseLuaVisitor } from "../parser/parser";

type CstContext = CstNode | CstNode[];

export class LuaVisitor extends BaseLuaVisitor {
  constructor() {
    super();
    // The "validateVisitor" method is a helper utility which performs static analysis
    // to detect missing or redundant visitor methods
    this.validateVisitor();
    this.fileBuffer = [];
  }

  private fileBuffer: String[][];

  public appendLineToFileBuffer(...lines: String[][]) {
    this.fileBuffer.push(...lines);
  }

  public getFileBuffer() {
    return this.fileBuffer;
  }

  public block(ctx: any) {
    ctx.statement?.map((statement) => {
      const evaluatedStatement = this.visit(statement);

      this.appendLineToFileBuffer([
        "--",
        "evaluated types:",
        ...evaluatedStatement[0].map((ev) => ev.type),
      ]);

      this.appendLineToFileBuffer(evaluatedStatement[1]);
    });
  }

  public statement(ctx: any) {
    const [declaredVars, lineBuffer] = this.visit(ctx.variableDeclaration);

    return [declaredVars, lineBuffer];
  }

  public variableIdentifier(ctx: any) {
    return {
      name: ctx.Identifier[0].image,
      type: ctx.Identifier[1]?.image,
    };
  }

  public variableDeclaration(ctx: any) {
    const declaredVars: any[] = [];

    let lineBuffer: String[] = ["="];
    let amt = 0;

    const identifiers = ctx.variableIdentifier.map((idtf) => this.visit(idtf));

    identifiers.map((idtf, i) => {
      const curVar = {
        ...idtf,
        value: ctx.Integer[i].image,
      };

      declaredVars.push(curVar);

      lineBuffer.push(curVar.value);
      lineBuffer = [
        ...lineBuffer.slice(0, amt),
        curVar.name,
        ...lineBuffer.slice(amt),
      ];

      amt++;
    });

    console.log("variableDeclaration", declaredVars, lineBuffer);

    return [declaredVars, lineBuffer];
  }
}
