import { Lexer } from "chevrotain";
import {
  BinaryOperator,
  Colon,
  Comma,
  Equals,
  Identifier,
  LParen,
  LocalKeyword,
  NumberLiteral,
  RParen,
  Semicolon,
  WhiteSpace,
} from "./tokens/index.js";

export const AllTokens = [
  // Generic tokens
  WhiteSpace,
  Comma,
  Semicolon,
  Colon,
  LParen,
  RParen,
  // Literals
  NumberLiteral,
  // Operators
  BinaryOperator,
  // Reserved keywords
  LocalKeyword,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Equals,
];

const LuaLexer = new Lexer(AllTokens);

export { LuaLexer };
