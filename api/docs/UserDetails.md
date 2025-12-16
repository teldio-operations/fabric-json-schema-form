
# UserDetails


## Properties

Name | Type
------------ | -------------
`role` | [Role](Role.md)
`username` | string

## Example

```typescript
import type { UserDetails } from 'api'

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "username": null,
} satisfies UserDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


