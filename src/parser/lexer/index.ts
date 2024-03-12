import { Lexer } from "chevrotain";
import {
  Colon,
  Equals,
  Identifier,
  Integer,
  LocalKeyword,
  Semicolon,
  WhiteSpace,
} from "./tokens/index.js";

export const AllTokens = [
  // Generic tokens
  WhiteSpace,
  Semicolon,
  Colon,
  // Reserved keywords
  LocalKeyword,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  Equals,
];

const LuaLexer = new Lexer(AllTokens);

export { LuaLexer };
