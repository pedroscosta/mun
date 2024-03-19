export const conditionalJoin = (
  input: string[],
  separator: string,
  conditional: (prev: string, cur: string) => boolean
): string => {
  let output = input[0];
  let prev = output;

  for (const cur of input.slice(1)) {
    if (conditional(prev, cur)) output += separator;
    output += cur;
    prev = cur;
  }

  return output;
};
