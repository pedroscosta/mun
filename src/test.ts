import { parseInput } from "./parser/parser";
import { conditionalJoin } from "./utils/printingUtils";
import { LuaVisitor } from "./visitor";

import { writeFile } from "fs/promises";
import { resolve } from "path";

const code = `
a: String, b = 1234, 123
c = 321
`;

// local function test(arg1)
//   while true do
//     if 1 + 1 == 2 then
//       break
//     end
//   end
// end

// test()

code.split(`\n`).forEach((l, ln) => {
  console.log(ln, l);
});

const parseResult = parseInput(code);

console.log("-------");

const visitor = new LuaVisitor();
const cst = visitor.visit(parseResult);

try {
  await writeFile(
    resolve("./test.lua"),
    visitor
      .getFileBuffer()
      .map((lineBuffer) =>
        conditionalJoin(lineBuffer, " ", (prev, cur) => cur !== ",")
      ) // TODO: Conditionally join with ' ' or '', commas don't get separated
      .join("\n")
  );
} catch (err) {
  console.log(err);
}

console.log("written to", resolve("./test.lua"));
