import { PrintableNode, TypedNode } from '../types';

export const isNodeEmpty = (node: PrintableNode | TypedNode | undefined): boolean => {
  if (node === undefined) return true;
  if ('type' in node && (node as TypedNode).type === undefined) return true;
  if ('output' in node && (node as PrintableNode).output[0] === undefined) return true;
  return false;
};
