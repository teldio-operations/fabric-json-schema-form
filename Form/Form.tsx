import { Button, Stack } from "@mui/material";
import { type FormProps } from "@rjsf/core";
import RJSFMuiForm from "@rjsf/mui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback } from "react";

import { ComboboxWidget } from "../components/ComboboxWidget";
import { CustomTimePicker } from "../components/CustomTimePicker";
import NumberField from "../components/NumberField";
import { omitNulls } from "../utils/data";
import { validator } from "../utils/validator";
import { PreventSubmitOnEnter } from "./PreventSubmitOnEnter";
import { QueryableField } from "./QueryableField";
import { SchemaField } from "./SchemaField";

export type FabricJsonSchemaFormProps = Omit<FormProps, "validator"> & {
  onCancel?: () => void;
  loading?: boolean;
  disableSubmitOnEnter?: boolean;
};

const queryClient = new QueryClient();

export const FabricJsonSchemaForm = ({
  onCancel,
  loading,
  children,
  disableSubmitOnEnter,
  ...props
}: FabricJsonSchemaFormProps) => {
  const submitButtonOptions =
    props.uiSchema?.["ui:options"]?.submitButtonOptions ??
    props.uiSchema?.["ui:submitButtonOptions"];

  const showSubmitButton = submitButtonOptions?.norender !== true;

  const disabled = props.disabled || loading;

  const submitButton = children ?? (
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
  );

  const onChange: FabricJsonSchemaFormProps["onChange"] = useCallback(
    ({ formData, ...data }, id) => {
      props.onChange?.({ ...data, formData: omitNulls(formData) }, id);
    },
    [props],
  );

  const onSubmit: FabricJsonSchemaFormProps["onSubmit"] = useCallback(
    ({ formData, ...data }, id) => {
      props.onSubmit?.({ ...data, formData: omitNulls(formData) }, id);
    },
    [props],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PreventSubmitOnEnter disableSubmitOnEnter={disableSubmitOnEnter}>
        <RJSFMuiForm
          {...props}
          validator={validator}
          disabled={disabled}
          onChange={onChange}
          onSubmit={onSubmit}
          fields={{
            SchemaField,
            QueryableField,
            NumberField,
            ...props.fields,
          }}
          widgets={{
            TimeWidget: CustomTimePicker,
            combobox: ComboboxWidget,
            ...props.widgets,
          }}
        >
          {showSubmitButton ? submitButton : undefined}
        </RJSFMuiForm>
      </PreventSubmitOnEnter>
    </QueryClientProvider>
  );
};
