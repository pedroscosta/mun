import MunType from './MunType';
import AnyType from './generics/AnyType';
import NumberType from './literals/Number';
import StringType from './literals/String';

const defaultTypes: Record<string, MunType> = {
  string: new StringType(),
  number: new NumberType(),
  any: new AnyType(),
};

export { defaultTypes };
