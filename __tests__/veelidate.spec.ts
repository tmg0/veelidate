// @ts-nocheck

import { describe, expect, test } from 'vitest'
import { defineValidator as v, defineField as f } from '../index'

const eg1 = v().setup(() => ({
  str: f<string>().isString(),
  num: f<number>().isNumber()
}))

const eg2 = v().setup(() => ({
  obj: v().setup(() => ({
    str: f<string>().isString(),
    num: f<number>().isNumber()
  }))
}))

const pVR = async (validator: { validate: () => Promise<void> }) => {
  try {
    await validator.validate()
    return true
  } catch (error) {
    return false
  }
}

describe('define validator', () => {
  test('should check default value', async () => {
    expect(await pVR(eg1)).toBe(true)
  })

  test('should check string type field', async () => {
    eg1.value = { str: '', num: 0 }
    eg1.value.str = 0
    expect(await pVR(eg1)).toBe(false)
  })

  test('should check number type field', async () => {
    eg1.value = { str: '', num: 0 }
    eg1.value.num = ''
    expect(await pVR(eg1)).toBe(false)
  })

  test('should checkout object type field', async () => {
    expect(await pVR(eg2)).toBe(true)
  })

  test('should deep clone in validator object', async () => {
    eg2.value = { obj: { str: 0 } }
    expect(await pVR(eg2)).toBe(false)
  })
})
