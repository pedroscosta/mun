export default class MunType {
  constructor() {}

  protected _name: string;

  public get name(): string {
    return this._name;
  }

  equals(other: MunType): boolean {
    return true;
  }

  toString() {
    return `${this._name}[${Object.entries(this)
      .filter(([field]) => !field.startsWith('_'))
      .map(([field, value]) => `${field}=${value}`)
      .join(', ')}]`;
  }
}
