// @ts-nocheck

import { describe, expect, test } from 'vitest'
import { defineValidator, defineField } from '../index'

const defaultV = {
  stringField: '',
  numberField: 0
}

const validator = defineValidator().setup(() => ({
  stringField: defineField<string>().isString(),
  numberField: defineField<number>().isNumber(),
  objectField: defineValidator().setup(() => ({
    strF: defineField<string>('').isString(),
    numF: defineField<number>()
  }))
}))

const parseValidateResult = async (validator: { validate: () => Promise<void> }) => {
  try {
    await validator.validate()
    return true
  } catch { return false }
}

describe('define validator', () => {
  test('should check default value', async () => {
    validator.value = defaultV
    expect(await parseValidateResult(validator)).toBe(true)
  })

  test('should check string type field', async () => {
    validator.value = defaultV
    validator.value.stringField = 0
    expect(await parseValidateResult(validator)).toBe(false)
  })

  test('should check number type field', async () => {
    validator.value = defaultV
    validator.value.numberField = ''
    expect(await parseValidateResult(validator)).toBe(false)
  })

  test('should check object type field', async () => {
    validator.value = defaultV
    validator.value.objectField.strF = 0
    expect(await parseValidateResult(validator)).toBe(false)
  })
})
