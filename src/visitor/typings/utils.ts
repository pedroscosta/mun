import MunType from './MunType';

export const assertTypeMatch = (a: MunType, b: MunType) => {
  if (!(a.equals(b) || b.equals(a))) throw new Error(`type mismatch: ${a} doesn't match ${b}`);
};
