import MunType from '../MunType';

export default class StringType extends MunType {
  constructor() {
    super();
    this._name = 'string';
  }

  equals(other: MunType): boolean {
    if (!(other instanceof StringType)) return false;
    return true;
  }
}
