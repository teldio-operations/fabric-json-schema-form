
# ConfigInput


## Properties

Name | Type
------------ | -------------
`$schema` | string
`config` | { [key: string]: any; }
`description` | string
`id` | string
`module` | string
`title` | string

## Example

```typescript
import type { ConfigInput } from 'api'

// TODO: Update the object below with actual values
const example = {
  "$schema": null,
  "config": null,
  "description": null,
  "id": null,
  "module": null,
  "title": null,
} satisfies ConfigInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConfigInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


