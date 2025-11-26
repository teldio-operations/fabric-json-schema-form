import { Button, Stack } from "@mui/material";
import { getDefaultRegistry, type FormProps } from "@rjsf/core";
import Form from "@rjsf/mui";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CustomTimePicker } from "./CustomTimePicker";

dayjs.extend(customParseFormat);

const validator = customizeValidator({
  AjvClass: Ajv2020,
  ajvOptionsOverrides: {},
});

const {
  fields: { SchemaField: DefaultSchemaField },
} = getDefaultRegistry();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RjsfFormProps = FormProps<any, RJSFSchema, any>;

export type FabricJsonSchemaFormProps = Omit<RjsfFormProps, "validator"> & {
  onCancel?: () => void;
  loading?: boolean;
};

export const FabricJsonSchemaForm = ({
  onCancel,
  loading,
  ...props
}: FabricJsonSchemaFormProps) => {
  const showSubmitButton =
    props.uiSchema?.["ui:submitButtonOptions"]?.norender !== true;

  const disabled = props.disabled || loading;

  return (
    <Form
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
    </Form>
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

  return (
    <DefaultSchemaField
      {...props}
      uiSchema={{ "ui:widget": props.schema.control, ...props.uiSchema }}
    />
  );
};
