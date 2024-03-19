import { createToken, Lexer } from "chevrotain";

// Operators
export const Equals = createToken({ name: "Equals", pattern: /=/ });
export const BinaryOperator = createToken({
  name: "BinaryOperator",
  pattern: /\+/,
});

// Literals
export const Literal = createToken({
  name: "Literal",
  pattern: Lexer.NA,
});

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /0|[1-9]\d*/,
  categories: Literal,
});

export const LocalKeyword = createToken({
  name: "LocalKeyword",
  pattern: /local/,
});

export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z]\w*/,
});

// Generic Tokens

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
export const Semicolon = createToken({
  name: "Semicolon",
  pattern: /[;]+/,
});
export const Comma = createToken({
  name: "Comma",
  pattern: /[,]+/,
});
export const Colon = createToken({
  name: "Colon",
  pattern: /[:]+/,
});
export const LParen = createToken({
  name: "LParen",
  pattern: /\(/,
});
export const RParen = createToken({
  name: "RParen",
  pattern: /\)/,
});
