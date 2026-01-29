import { getDefaultRegistry } from "@rjsf/core";
import type { FieldProps } from "@rjsf/utils";

const {
  fields: { SchemaField: DefaultSchemaField },
} = getDefaultRegistry();

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

  let uiSchema: typeof props.uiSchema = {};

  if (props.schema.type === "string") {
    const isPassword = props.schema.control === "password";
    uiSchema = {
      "ui:autocomplete": isPassword ? "new-password" : "off",
      ...props.uiSchema,
    };
  }

  if (props.schema.control) {
    uiSchema = { "ui:widget": props.schema.control, ...uiSchema };
  }

  if (props.schema.control == "queryable") {
    uiSchema = { "ui:field": "QueryableField", ...uiSchema };
  }

  if (Object.keys(uiSchema).length !== 0) {
    return <DefaultSchemaField {...props} uiSchema={uiSchema} />;
  }

  return <DefaultSchemaField {...props} />;
};
