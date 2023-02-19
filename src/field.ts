import { FieldValidate } from './enums'

export const isField = (value: any): value is Field => value.constructor === Field

export class Field<T = any> {
  public value: T
  public chains: FieldValidate[] = []
  public _min?: number
  public _max?: number
  public _maxLength?: number

  constructor (value: any) {
    this.value = value
  }

  isString () {
    this.chains.push(FieldValidate.IS_STRING)
    return this
  }

  isNumber () {
    this.chains.push(FieldValidate.IS_NUMBER)
    return this
  }

  min ({ _min }: this) {
    this._min = _min
    this.chains.push(FieldValidate.MIN)
    return this
  }

  max ({ _max }: this) {
    this._max = _max
    this.chains.push(FieldValidate.MAX)
    return this
  }

  maxLength ({ _maxLength }: this) {
    this._maxLength = _maxLength
    this.chains.push(FieldValidate.MAX_LENGTH)
    return this
  }
}
