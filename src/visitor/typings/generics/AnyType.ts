import MunType from '../MunType';

export default class AnyType extends MunType {
  constructor() {
    super();
    this._name = 'any';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equals(_other: MunType): boolean {
    return true;
  }
}
