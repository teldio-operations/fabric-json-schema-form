import { Autocomplete, Stack, TextField } from "@mui/material";
import { ariaDescribedByIds, type FieldProps } from "@rjsf/utils";

type MultiSchemaOption = {
  label: string;
  index: number;
  schema: FieldProps["schema"];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const optionSchemas = (schema: FieldProps["schema"]) =>
  (schema.oneOf ?? schema.anyOf ?? []).filter(
    isRecord,
  ) as FieldProps["schema"][];

const hasConst = (schema: FieldProps["schema"]) =>
  Object.prototype.hasOwnProperty.call(schema, "const");

const constValue = (schema: FieldProps["schema"]) =>
  (schema as Record<string, unknown>).const;

const optionsFromSchema = (schema: FieldProps["schema"]): MultiSchemaOption[] =>
  optionSchemas(schema).map((optionSchema, index) => ({
    label: optionSchema.title ?? `Option ${index + 1}`,
    index,
    schema: optionSchema,
  }));

const selectedOption = (
  options: MultiSchemaOption[],
  formData: FieldProps["formData"],
) => {
  const constMatch = options.find(
    (option) =>
      hasConst(option.schema) && constValue(option.schema) === formData,
  );

  if (constMatch) {
    return constMatch;
  }

  return options.find((option) => !hasConst(option.schema)) ?? options[0];
};

const stringValue = (value: unknown) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
};

export const ComboboxMultiSchemaField = (props: FieldProps) => {
  const options = optionsFromSchema(props.schema);
  const selected = selectedOption(options, props.formData);

  if (!selected) {
    return null;
  }

  const fieldId =
    props.fieldPathId?.$id ?? props.idSchema?.$id ?? props.name ?? "path";
  const fieldPath = props.fieldPathId?.path ?? [];

  const selectId = `${fieldId}__selector`;
  const valueId = `${fieldId}__value`;

  const selectedHasConst = hasConst(selected.schema);
  const selectedConstValue = selectedHasConst
    ? constValue(selected.schema)
    : undefined;

  const helperText =
    props.rawErrors?.[0] ??
    selected.schema.description ??
    props.schema.description;

  const changeValue = (nextValue: unknown) => {
    // Use the field-path aware onChange signature for this RJSF version so the
    // selected oneOf value updates the current field rather than the parent form.
    props.onChange(nextValue, fieldPath, undefined, fieldId);
  };

  return (
    <Stack spacing={2}>
      <Autocomplete<MultiSchemaOption, false, true, false>
        id={selectId}
        autoHighlight
        openOnFocus
        selectOnFocus
        disableClearable
        disabled={props.disabled || props.readonly}
        options={options}
        value={selected}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, selectedOption) =>
          option.index === selectedOption.index
        }
        onChange={(_, option) => {
          if (hasConst(option.schema)) {
            changeValue(constValue(option.schema));
            return;
          }

          changeValue("");
        }}
        renderInput={({ inputProps, ...restProps }) => (
          <TextField
            {...restProps}
            label={props.schema.title ?? props.name}
            required={props.required}
            error={!!props.rawErrors?.length}
            slotProps={{
              htmlInput: {
                ...inputProps,
                "aria-describedby": ariaDescribedByIds(selectId),
              },
            }}
          />
        )}
      />

      <TextField
        id={valueId}
        fullWidth
        label={selected.schema.title ?? props.name}
        required={props.required}
        disabled={props.disabled || props.readonly}
        error={!!props.rawErrors?.length}
        value={
          selectedHasConst
            ? stringValue(selectedConstValue)
            : stringValue(props.formData)
        }
        helperText={helperText}
        onChange={(event) => changeValue(event.target.value)}
        slotProps={{
          htmlInput: {
            readOnly: selectedHasConst,
            "aria-describedby": ariaDescribedByIds(valueId),
          },
        }}
      />
    </Stack>
  );
};
