
# Event2Data

The event body.

## Properties

Name | Type
------------ | -------------
`meta` | [EventMeta](EventMeta.md)

## Example

```typescript
import type { Event2Data } from 'api'

// TODO: Update the object below with actual values
const example = {
  "meta": null,
} satisfies Event2Data

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Event2Data
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


