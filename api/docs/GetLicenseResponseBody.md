
# GetLicenseResponseBody


## Properties

Name | Type
------------ | -------------
`$schema` | string
`configuredModules` | number
`expiry` | Date
`license` | [LicenseClaims](LicenseClaims.md)
`licenseError` | string
`licenseWarning` | string
`shortError` | string

## Example

```typescript
import type { GetLicenseResponseBody } from 'api'

// TODO: Update the object below with actual values
const example = {
  "$schema": null,
  "configuredModules": null,
  "expiry": null,
  "license": null,
  "licenseError": null,
  "licenseWarning": null,
  "shortError": null,
} satisfies GetLicenseResponseBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetLicenseResponseBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


