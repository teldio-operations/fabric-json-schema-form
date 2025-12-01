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

  if (props.schema.control != null) {
    return (
      <DefaultSchemaField
        {...props}
        uiSchema={{ "ui:widget": props.schema.control, ...props.uiSchema }}
      />
    );
  }

  return <DefaultSchemaField {...props} />;
};
