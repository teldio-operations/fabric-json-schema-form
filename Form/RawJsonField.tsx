import { TextField, Typography } from "@mui/material";
import {
  descriptionId,
  getTemplate,
  getUiOptions,
  type FieldProps,
} from "@rjsf/utils";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

const stringify = (value: unknown): string =>
  value === undefined ? "" : (JSON.stringify(value, null, 2) ?? "");

export const RawJsonField = (props: FieldProps<unknown>) => {
  const {
    schema,
    uiSchema,
    registry,
    required,
    disabled,
    readonly,
    onChange,
    formData,
    fieldPathId: { $id: id, path },
  } = props;

  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);
  const title = uiOptions.title ?? schema.title;
  const description = uiOptions.description ?? schema.description;

  const DescriptionFieldTemplate = getTemplate(
    "DescriptionFieldTemplate",
    registry,
    uiOptions,
  );

  const serializedFormData = stringify(formData);
  const rootSchemaKey = JSON.stringify(registry.rootSchema);
  const lastRootSchemaKey = useRef(rootSchemaKey);
  const lastEmitted = useRef(serializedFormData);
  const [value, setValue] = useState(serializedFormData);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (rootSchemaKey !== lastRootSchemaKey.current) {
      lastRootSchemaKey.current = rootSchemaKey;
      lastEmitted.current = serializedFormData;
      setValue(serializedFormData);
      setError(undefined);
      return;
    }

    if (serializedFormData !== lastEmitted.current) {
      lastEmitted.current = serializedFormData;
      setValue(serializedFormData);
      setError(undefined);
    }
  }, [rootSchemaKey, serializedFormData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (nextValue.trim() === "") {
      lastEmitted.current = "";
      setError(undefined);
      onChange(undefined, path);
      return;
    }

    try {
      const parsed = JSON.parse(nextValue);
      lastEmitted.current = stringify(parsed);
      setError(undefined);
      onChange(parsed, path);
    } catch {
      setError("Invalid JSON");

      if (formData !== undefined) {
        lastEmitted.current = "";
        onChange(undefined, path);
      }
    }
  };

  return (
    <>
      <TextField
        id={id}
        label={title}
        helperText={error}
        error={error !== undefined}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled || readonly}
        fullWidth
        multiline
        minRows={1}
        maxRows={8}
        sx={{ "& textarea": { fontFamily: "monospace" } }}
      />

      {description && (
        <Typography variant="caption" color="textSecondary">
          <DescriptionFieldTemplate
            id={descriptionId(id)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        </Typography>
      )}
    </>
  );
};
