
# GetUsersOutputBody


## Properties

Name | Type
------------ | -------------
`$schema` | string
`users` | [Array&lt;UserDetails&gt;](UserDetails.md)

## Example

```typescript
import type { GetUsersOutputBody } from 'api'

// TODO: Update the object below with actual values
const example = {
  "$schema": null,
  "users": null,
} satisfies GetUsersOutputBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetUsersOutputBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


