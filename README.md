# Veelidate

A simple object validator for javascript / typescript.

## Setup

```sh
// use pnpm
pnpm add veeliadte -S
```

## Usage

```ts
import { defineField, defineValidator } from 'veelidate'

const json = {}

const v = defineValidator().setup(() => ({
  str: defineField('').required().isString()
}))

(async () => {
  const valid = await v.validate()

  // ... do something
})()
```

## Api

- `defineField`

- `defineValidator`
