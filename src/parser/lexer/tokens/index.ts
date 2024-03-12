import { createToken, Lexer } from "chevrotain";

const Equals = createToken({ name: "Equals", pattern: /=/ });

const LocalKeyword = createToken({ name: "LocalKeyword", pattern: /local/ });

const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });

const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const Semicolon = createToken({
  name: "Semicolon",
  pattern: /[;]+/,
});

const Colon = createToken({
  name: "Colon",
  pattern: /[:]+/,
});

export {
  Colon,
  Equals,
  Identifier,
  Integer,
  LocalKeyword,
  Semicolon,
  WhiteSpace,
};
