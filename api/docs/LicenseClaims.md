
# LicenseClaims


## Properties

Name | Type
------------ | -------------
`id` | string
`issued` | Date
`v1` | [LicenseV1](LicenseV1.md)
`version` | number

## Example

```typescript
import type { LicenseClaims } from 'api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "issued": null,
  "v1": null,
  "version": null,
} satisfies LicenseClaims

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LicenseClaims
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


