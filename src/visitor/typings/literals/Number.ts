import MunType from '../MunType';

export default class NumberType extends MunType {
  constructor() {
    super();
    this._name = 'number';
  }

  equals(other: MunType): boolean {
    if (!(other instanceof NumberType)) return false;
    return true;
  }
}
