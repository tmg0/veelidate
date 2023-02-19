import { Validator } from './src/validator'
import { Field } from './src/field'

const defineValidator = () => ({
  setup<T extends Record<string, any>> (getter: () => T) {
    return new Validator(getter)
  }
})

const defineField = <T>(value?: T) => {
  return new Field<T>(value)
}

export { defineValidator, defineField, Validator, Field }
