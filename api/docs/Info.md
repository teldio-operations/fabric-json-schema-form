
# Info


## Properties

Name | Type
------------ | -------------
`$schema` | string
`config` | [Schema](Schema.md)
`description` | string
`emits` | [Array&lt;EventInfo&gt;](EventInfo.md)
`listens` | [Array&lt;EventInfo&gt;](EventInfo.md)
`name` | string
`proxy` | [ProxyOptions](ProxyOptions.md)
`queries` | [Array&lt;Queryable&gt;](Queryable.md)
`service` | boolean
`title` | string
`version` | string

## Example

```typescript
import type { Info } from 'api'

// TODO: Update the object below with actual values
const example = {
  "$schema": null,
  "config": null,
  "description": null,
  "emits": null,
  "listens": null,
  "name": null,
  "proxy": null,
  "queries": null,
  "service": null,
  "title": null,
  "version": null,
} satisfies Info

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Info
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


