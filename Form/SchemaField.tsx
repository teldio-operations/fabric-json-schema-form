import { getDefaultRegistry } from "@rjsf/core";
import type { FieldProps } from "@rjsf/utils";

const {
  fields: { SchemaField: DefaultSchemaField },
} = getDefaultRegistry();

type UiSchema = NonNullable<FieldProps["uiSchema"]>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getObjectOption = (value: unknown) => (isRecord(value) ? value : {});

const withMaxLength = (uiSchema: UiSchema, maxLength: number): UiSchema => {
  const options = getObjectOption(uiSchema["ui:options"]);
  const inputProps = getObjectOption(options.inputProps);

  return {
    ...uiSchema,
    "ui:options": {
      ...options,
      inputProps: {
        ...inputProps,
        maxLength,
      },
    },
  };
};

const withItemNumbers =
  (title: string, items: UiSchema["items"]): UiSchema["items"] =>
  (item: unknown, index: number, formContext: unknown) => ({
    "ui:title": `${title} ${index + 1}`,
    ...(typeof items === "function" ? items(item, index, formContext) : items),
  });

export const SchemaField = (props: FieldProps) => {
  if (!DefaultSchemaField) {
    return null;
  }

  if (props.schema.type === "string" && props.schema.format === "time") {
    return (
      <DefaultSchemaField
        {...props}
        uiSchema={{ "ui:widget": "TimeWidget", ...props.uiSchema }}
      />
    );
  }

  let uiSchema: UiSchema = {};

  if (props.schema.type === "string") {
    const isPassword = props.schema.control === "password";

    uiSchema = {
      "ui:autocomplete": isPassword ? "new-password" : "off",
      ...props.uiSchema,
    };

    if (typeof props.schema.maxLength === "number") {
      uiSchema = withMaxLength(uiSchema, props.schema.maxLength);
    }
  }

  if (props.schema.control) {
    uiSchema = { "ui:widget": props.schema.control, ...uiSchema };
  }

  if (props.schema.control == "queryable") {
    uiSchema = { "ui:field": "QueryableField", ...uiSchema };
  }

  if (props.schema.control == "queryable-list") {
    uiSchema = { "ui:field": "QueryableListField", ...uiSchema };
  }

  if (props.schema.control == "rawjson") {
    uiSchema = { "ui:field": "RawJsonField", ...uiSchema };
  }

  if (
    props.schema.type === "array" &&
    isRecord(props.schema.items) &&
    typeof props.schema.items.title === "string" &&
    !props.registry.schemaUtils.isMultiSelect(props.schema)
  ) {
    uiSchema = {
      ...props.uiSchema,
      ...uiSchema,
      items: withItemNumbers(props.schema.items.title, props.uiSchema?.items),
    };
  }

  if (Object.keys(uiSchema).length !== 0) {
    return <DefaultSchemaField {...props} uiSchema={uiSchema} />;
  }

  return <DefaultSchemaField {...props} />;
};
