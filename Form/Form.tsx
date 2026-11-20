import { Button, Stack } from "@mui/material";
import { type FormProps } from "@rjsf/core";
import RJSFMuiForm from "@rjsf/mui";
import { ErrorSchemaBuilder, type FieldPathList } from "@rjsf/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ArrayFieldItemTemplate } from "../components/ArrayFieldItemTemplate";
import { ComboboxWidget } from "../components/ComboboxWidget";
import { CustomTimePicker } from "../components/CustomTimePicker";
import { NumberField } from "../components/NumberField";
import { PasswordWidget } from "../components/PasswordWidget";
import { omitNulls } from "../utils/data";
import {
  FieldErrorContext,
  type SetFieldError,
} from "../utils/fieldErrorContext";
import { validator } from "../utils/validator";
import { PreventSubmitOnEnter } from "./PreventSubmitOnEnter";
import { QueryableField } from "./QueryableField";
import { RawJsonField } from "./RawJsonField";
import { SchemaField } from "./SchemaField";

export type FabricJsonSchemaFormProps = Omit<FormProps, "validator"> & {
  onCancel?: () => void;
  loading?: boolean;
  disableSubmitOnEnter?: boolean;
  onFieldErrorsChange?: (errors: FieldError[]) => void;
};

export type FieldError = { path: FieldPathList; message: string };

const queryClient = new QueryClient();

export const FabricJsonSchemaForm = ({
  onCancel,
  loading,
  children,
  disableSubmitOnEnter,
  onFieldErrorsChange,
  ...props
}: FabricJsonSchemaFormProps) => {
  const submitButtonOptions =
    props.uiSchema?.["ui:options"]?.submitButtonOptions ??
    props.uiSchema?.["ui:submitButtonOptions"];

  const showSubmitButton = submitButtonOptions?.norender !== true;

  const disabled = props.disabled || loading;

  const [fieldErrors, setFieldErrors] = useState<Record<string, FieldError>>(
    {},
  );

  const setFieldError = useCallback<SetFieldError>((path, message) => {
    const key = path.join(".");
    setFieldErrors((prev) => {
      if (message === undefined) {
        if (!(key in prev)) {
          return prev;
        }
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }
      if (prev[key]?.message === message) {
        return prev;
      }
      return { ...prev, [key]: { path, message } };
    });
  }, []);

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  const onFieldErrorsChangeRef = useRef(onFieldErrorsChange);
  onFieldErrorsChangeRef.current = onFieldErrorsChange;

  useEffect(() => {
    onFieldErrorsChangeRef.current?.(Object.values(fieldErrors));
  }, [fieldErrors]);

  useEffect(() => {
    return () => onFieldErrorsChangeRef.current?.([]);
  }, []);

  const extraErrors = useMemo(() => {
    if (!hasFieldErrors) {
      return props.extraErrors;
    }
    const builder = new ErrorSchemaBuilder(props.extraErrors);
    for (const { path, message } of Object.values(fieldErrors)) {
      builder.setErrors([message], path);
    }
    return builder.ErrorSchema;
  }, [fieldErrors, hasFieldErrors, props.extraErrors]);

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
        disabled={props.disabled || hasFieldErrors}
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

  // NumberField reports minimum/maximum itself as soon as the value changes.
  // Drop ajv's copy so the field does not show the error twice.
  const transformErrors: FabricJsonSchemaFormProps["transformErrors"] =
    useCallback<NonNullable<FabricJsonSchemaFormProps["transformErrors"]>>(
      (errors, uiSchema) => {
        const filtered = errors.filter(
          (error) => error.name !== "minimum" && error.name !== "maximum",
        );
        return props.transformErrors
          ? props.transformErrors(filtered, uiSchema)
          : filtered;
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
    <FieldErrorContext.Provider value={setFieldError}>
      <QueryClientProvider client={queryClient}>
        <PreventSubmitOnEnter disableSubmitOnEnter={disableSubmitOnEnter}>
          <RJSFMuiForm
            {...props}
            validator={validator}
            disabled={disabled}
            onChange={onChange}
            onSubmit={onSubmit}
            transformErrors={transformErrors}
            extraErrors={extraErrors}
            showErrorList={false}
            extraErrorsBlockSubmit={
              hasFieldErrors || props.extraErrorsBlockSubmit
            }
            fields={{
              SchemaField,
              QueryableField,
              RawJsonField,
              NumberField,
              ...props.fields,
            }}
            widgets={{
              TimeWidget: CustomTimePicker,
              combobox: ComboboxWidget,
              password: PasswordWidget,
              ...props.widgets,
            }}
            templates={{
              ArrayFieldItemTemplate,
              ...props.templates,
            }}
          >
            {showSubmitButton ? submitButton : undefined}
          </RJSFMuiForm>
        </PreventSubmitOnEnter>
      </QueryClientProvider>
    </FieldErrorContext.Provider>
  );
};
