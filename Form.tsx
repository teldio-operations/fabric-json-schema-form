import { Button, Stack } from "@mui/material";
import { getDefaultRegistry, type FormProps } from "@rjsf/core";
import RJSFMuiForm from "@rjsf/mui";
import type { FieldProps } from "@rjsf/utils";
import { CustomTimePicker } from "./CustomTimePicker";
import { validator } from "./validator";

const {
  fields: { SchemaField: DefaultSchemaField },
} = getDefaultRegistry();

export type FabricJsonSchemaFormProps = Omit<FormProps, "validator"> & {
  onCancel?: () => void;
  loading?: boolean;
};

export const FabricJsonSchemaForm = ({
  onCancel,
  loading,
  ...props
}: FabricJsonSchemaFormProps) => {
  const submitButtonOptions =
    props.uiSchema?.["ui:options"]?.submitButtonOptions ??
    props.uiSchema?.["ui:submitButtonOptions"];

  const showSubmitButton = submitButtonOptions?.norender !== true;

  const disabled = props.disabled || loading;

  return (
    <RJSFMuiForm
      {...props}
      validator={validator}
      disabled={disabled}
      fields={{ SchemaField, ...props.fields }}
      widgets={{ TimeWidget: CustomTimePicker, ...props.widgets }}
    >
      {showSubmitButton && (
        <Stack
          width="100%"
          gap={2}
          direction="row"
          justifyContent="end"
          flexWrap={"wrap"}
        >
          {onCancel && (
            <Button disabled={disabled} color="inherit" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button
            loading={loading}
            disabled={props.disabled}
            type="submit"
            variant="contained"
            {...props.uiSchema?.["ui:submitButtonOptions"]?.props}
          >
            {props.uiSchema?.["ui:submitButtonOptions"]?.submitText ?? "Submit"}
          </Button>
        </Stack>
      )}
    </RJSFMuiForm>
  );
};

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
