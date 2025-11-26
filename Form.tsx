import { Button, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getDefaultRegistry, type FormProps } from "@rjsf/core";
import Form from "@rjsf/mui";
import type { FieldProps, RJSFSchema, WidgetProps } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

type Props = Omit<RjsfFormProps, "validator"> & {
  onCancel?: () => void;
  loading?: boolean;
};

export const FabricJsonSchemaForm = ({
  onCancel,
  loading,
  ...props
}: Props) => {
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

const CustomTimePicker = (props: WidgetProps) => {
  const { label, value, onChange, disabled, readonly, rawErrors } = props;

  const handleChange = (newValue: PickerValue) => {
    onChange(newValue?.format("HH:mm:ss"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value ? dayjs(value, "HH:mm:ss") : null}
        onChange={handleChange}
        disabled={disabled || readonly}
        ampm={false}
        slotProps={{
          textField: {
            fullWidth: true,
            error: rawErrors && rawErrors.length > 0,
          },
        }}
      />
    </LocalizationProvider>
  );
};

const SchemaField = (props: FieldProps) => {
  if (!DefaultSchemaField) {
    return null;
  }

  if (props.schema.type === "string" && props.schema.control === "password") {
    return (
      <DefaultSchemaField {...props} uiSchema={{ "ui:widget": "password" }} />
    );
  }
  if (props.schema.type === "string" && props.schema.control === "textarea") {
    return (
      <DefaultSchemaField {...props} uiSchema={{ "ui:widget": "textarea" }} />
    );
  }
  if (props.schema.type === "string" && props.schema.format === "time") {
    return (
      <DefaultSchemaField {...props} uiSchema={{ "ui:widget": "TimeWidget" }} />
    );
  }
  return <DefaultSchemaField {...props} />;
};
