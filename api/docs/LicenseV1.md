
# LicenseV1


## Properties

Name | Type
------------ | -------------
`demo` | [DemoLicense](DemoLicense.md)
`development` | [DevelopmentLicense](DevelopmentLicense.md)
`hardwareId` | string
`perpetual` | [PerpetualLicense](PerpetualLicense.md)
`storedToken` | string

## Example

```typescript
import type { LicenseV1 } from 'api'

// TODO: Update the object below with actual values
const example = {
  "demo": null,
  "development": null,
  "hardwareId": null,
  "perpetual": null,
  "storedToken": null,
} satisfies LicenseV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LicenseV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


