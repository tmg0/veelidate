// @ts-nocheck

import { describe, expect, test } from 'vitest'
import { defineValidator, defineField } from '..'

const validator = defineValidator().setup(() => ({
  stringField: defineField('').isString(),
  numberField: defineField(0).isNumber(),
  objectField: defineValidator().setup(() => ({
    strF: defineField('').isString(),
    numF: defineField(0).isNumber()
  }))
}))

const reset = () => {
  validator.value.stringField = ''
  validator.value.numberField = 0
}

const parseValidateResult = async (validator: { validate: () => Promise<void> }) => {
  try {
    await validator.validate()
    return true
  } catch { return false }
}

describe('define validator', () => {
  test('should check default value', async () => {
    expect(await parseValidateResult(validator)).toBe(true)
  })

  test('should check string type field', async () => {
    reset()
    validator.value.stringField = 0
    expect(await parseValidateResult(validator)).toBe(false)
  })

  test('should check number type field', async () => {
    reset()
    validator.value.numberField = ''
    expect(await parseValidateResult(validator)).toBe(false)
  })

  test('should check object type field', async () => {
    reset()
    validator.value.objectField.value.strF = 0
    expect(await parseValidateResult(validator)).toBe(false)
  })
})
