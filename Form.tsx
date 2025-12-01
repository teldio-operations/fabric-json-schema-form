import { Button, Stack } from "@mui/material";
import { type FormProps } from "@rjsf/core";
import RJSFMuiForm from "@rjsf/mui";
import { CustomTimePicker } from "./CustomTimePicker";
import { SchemaField } from "./SchemaField";
import { validator } from "./validator";

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
