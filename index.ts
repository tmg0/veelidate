import { Validator } from './src/validator'
import { Field } from './src/field'

export const defineValidator = () => ({
  setup<T extends Record<string, any>> (getter: () => T) {
    return new Validator(getter)
  }
})

export const defineField = <T>(value?: T) => {
  return new Field<T>(value)
}
