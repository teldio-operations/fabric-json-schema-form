
# EventMeta

An event\'s metadata

## Properties

Name | Type
------------ | -------------
`eventId` | string
`eventName` | string
`replyToId` | string
`sourceModuleId` | string
`sourceModuleName` | string
`targetModuleId` | string
`targetModuleName` | string
`time` | Date

## Example

```typescript
import type { EventMeta } from 'api'

// TODO: Update the object below with actual values
const example = {
  "eventId": null,
  "eventName": null,
  "replyToId": null,
  "sourceModuleId": null,
  "sourceModuleName": null,
  "targetModuleId": null,
  "targetModuleName": null,
  "time": null,
} satisfies EventMeta

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EventMeta
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


