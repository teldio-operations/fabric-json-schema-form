
# Queryable


## Properties

Name | Type
------------ | -------------
`description` | string
`input` | [Schema](Schema.md)
`mediaType` | string
`name` | string
`title` | string

## Example

```typescript
import type { Queryable } from 'api'

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "input": null,
  "mediaType": null,
  "name": null,
  "title": null,
} satisfies Queryable

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Queryable
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


