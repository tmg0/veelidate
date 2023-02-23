import forIn from 'lodash.forin'
import setWith from 'lodash.setwith'
import { Validator, ValidatorFields, isValidator } from './src/validator'
import { Field, isField } from './src/field'

const isValue = (value: string): value is 'value' => value === 'value'

const defineValidator = () => ({
  setup<T extends Record<string, any>> (getter: () => T) {
    return new Proxy(new Validator(getter), {
      set (target: Record<string, any>, key: string, value) {
        if (!isValue(key)) { return true }

        forIn(value, (v: any, k: string) => {
          setWith(target.value, k, v)
        })

        return true
      }
    })
  }
})

const defineField = <T>(value?: T) => {
  return new Field<T>(value)
}

export { defineValidator, defineField, isField, isValidator, Validator, Field, ValidatorFields }
