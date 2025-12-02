
# Config


## Properties

Name | Type
------------ | -------------
`config` | { [key: string]: any; }
`configSecrets` | Array&lt;string&gt;
`description` | string
`disabled` | boolean
`id` | string
`isOnline` | boolean
`module` | string
`proxy` | [ProxyOptions](ProxyOptions.md)
`running` | boolean
`service` | boolean
`title` | string

## Example

```typescript
import type { Config } from 'api'

// TODO: Update the object below with actual values
const example = {
  "config": null,
  "configSecrets": null,
  "description": null,
  "disabled": null,
  "id": null,
  "isOnline": null,
  "module": null,
  "proxy": null,
  "running": null,
  "service": null,
  "title": null,
} satisfies Config

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Config
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


