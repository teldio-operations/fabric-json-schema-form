
# Schema


## Properties

Name | Type
------------ | -------------
`$anchor` | string
`$comment` | string
`$defs` | [{ [key: string]: Schema; }](Schema.md)
`$dynamicRef` | string
`$id` | string
`$ref` | string
`$schema` | string
`additionalProperties` | [Schema](Schema.md)
`allOf` | [Array&lt;Schema&gt;](Schema.md)
`anyOf` | [Array&lt;Schema&gt;](Schema.md)
`_const` | any
`contains` | [Schema](Schema.md)
`contentEncoding` | string
`contentMediaType` | string
`contentSchema` | [Schema](Schema.md)
`_default` | any
`dependentRequired` | { [key: string]: Array&lt;string&gt; | null; }
`dependentSchemas` | [{ [key: string]: Schema; }](Schema.md)
`deprecated` | boolean
`description` | string
`_else` | [Schema](Schema.md)
`_enum` | Array&lt;any&gt;
`examples` | Array&lt;any&gt;
`exclusiveMaximum` | number
`exclusiveMinimum` | number
`format` | string
`_if` | [Schema](Schema.md)
`items` | [Schema](Schema.md)
`maxContains` | number
`maxItems` | number
`maxLength` | number
`maxProperties` | number
`maximum` | number
`minContains` | number
`minItems` | number
`minLength` | number
`minProperties` | number
`minimum` | number
`multipleOf` | number
`not` | [Schema](Schema.md)
`oneOf` | [Array&lt;Schema&gt;](Schema.md)
`pattern` | string
`patternProperties` | [{ [key: string]: Schema; }](Schema.md)
`prefixItems` | [Array&lt;Schema&gt;](Schema.md)
`properties` | { [key: string]: any; }
`propertyNames` | [Schema](Schema.md)
`readOnly` | boolean
`required` | Array&lt;string&gt;
`then` | [Schema](Schema.md)
`title` | string
`type` | string
`uniqueItems` | boolean
`writeOnly` | boolean

## Example

```typescript
import type { Schema } from 'api'

// TODO: Update the object below with actual values
const example = {
  "$anchor": null,
  "$comment": null,
  "$defs": null,
  "$dynamicRef": null,
  "$id": null,
  "$ref": null,
  "$schema": null,
  "additionalProperties": null,
  "allOf": null,
  "anyOf": null,
  "_const": null,
  "contains": null,
  "contentEncoding": null,
  "contentMediaType": null,
  "contentSchema": null,
  "_default": null,
  "dependentRequired": null,
  "dependentSchemas": null,
  "deprecated": null,
  "description": null,
  "_else": null,
  "_enum": null,
  "examples": null,
  "exclusiveMaximum": null,
  "exclusiveMinimum": null,
  "format": null,
  "_if": null,
  "items": null,
  "maxContains": null,
  "maxItems": null,
  "maxLength": null,
  "maxProperties": null,
  "maximum": null,
  "minContains": null,
  "minItems": null,
  "minLength": null,
  "minProperties": null,
  "minimum": null,
  "multipleOf": null,
  "not": null,
  "oneOf": null,
  "pattern": null,
  "patternProperties": null,
  "prefixItems": null,
  "properties": null,
  "propertyNames": null,
  "readOnly": null,
  "required": null,
  "then": null,
  "title": null,
  "type": null,
  "uniqueItems": null,
  "writeOnly": null,
} satisfies Schema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Schema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


