export const assertTypeMatch = (a: string, b: string) => {
  if (a !== b && a !== 'any' && b !== 'any') throw new Error('type mismatch');
};
