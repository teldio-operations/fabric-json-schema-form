import { Autocomplete, TextField } from "@mui/material";
import { ariaDescribedByIds, type WidgetProps } from "@rjsf/utils";

type EnumOption = {
  label: string;
  value: unknown;
};

const enumOptions = (options: WidgetProps["options"]): EnumOption[] =>
  (options.enumOptions as EnumOption[] | undefined) ?? [];

export const ComboboxWidget = ({
  id,
  label,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  rawErrors,
  options,
}: WidgetProps) => {
  const choices = enumOptions(options);
  const selected = choices.find((choice) => choice.value === value) ?? null;

  return (
    <Autocomplete
      id={id}
      autoHighlight
      autoFocus={autofocus}
      disabled={disabled || readonly}
      options={choices}
      value={selected}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selectedOption) =>
        option.value === selectedOption.value
      }
      onChange={(_, option) => onChange(option?.value ?? undefined)}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      renderInput={({ inputProps, ...restProps }) => (
        <TextField
          {...restProps}
          label={label}
          required={required}
          placeholder={placeholder}
          error={!!rawErrors?.length}
          helperText={rawErrors?.[0]}
          slotProps={{
            htmlInput: {
              ...inputProps,
              "aria-describedby": ariaDescribedByIds(id),
            },
          }}
        />
      )}
    />
  );
};
