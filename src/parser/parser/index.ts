import { LuaLexer } from "../lexer";
import LuaParser from "./LuaParser";

export const parser = new LuaParser();

export function parseInput(text: string) {
  const lexingResult = LuaLexer.tokenize(text);
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  const output = parser.block();

  if (parser.errors.length > 0) {
    console.error(parser.errors);
    throw new Error("sad sad panda, Parsing errors detected");
  }

  return output;
}

export const BaseLuaVisitor = parser.getBaseCstVisitorConstructor();
