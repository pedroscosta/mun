import { parseInput } from './parser/parser';
import { conditionalJoin } from './utils/printingUtils';
import { MunBlockVisitor } from './visitor';

import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const code = `
a: string, b = 123
c = 321
`;

code.split(`\n`).forEach((l, ln) => {
  console.log(ln, l);
});

const parseResult = parseInput(code);

console.log('-------');

const visitor = new MunBlockVisitor();
const cst = visitor.visit(parseResult);

try {
  await writeFile(
    resolve('./test.lua'),
    visitor
      .getFileBuffer()
      .map((lineBuffer) => conditionalJoin(lineBuffer, ' ', (prev, cur) => cur !== ',')) // TODO: Conditionally join with ' ' or '', commas don't get separated
      .join('\n'),
  );
} catch (err) {
  console.log(err);
}

console.log('written to', resolve('./test.lua'));
