import { Autocomplete, TextField } from "@mui/material";
import { ariaDescribedByIds, type WidgetProps } from "@rjsf/utils";
import { useRef } from "react";

const REQUIRED_MESSAGE = "Please choose an option from the dropdown";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const choices = enumOptions(options);
  const selected = choices.find((choice) => choice.value === value) ?? null;
  const filterHint =
    choices.length === 0
      ? "No options available. Nothing can be selected."
      : `${choices.length} option${
          choices.length === 1 ? "" : "s"
        } available. Start typing to filter.`;

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
      onChange={(_, option) => {
        inputRef.current?.setCustomValidity("");
        onChange(option?.value ?? undefined);
      }}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      renderInput={({ inputProps, ...restProps }) => (
        <TextField
          {...restProps}
          inputRef={inputRef}
          label={label}
          required={required}
          placeholder={
            placeholder ? `${placeholder} (${filterHint})` : filterHint
          }
          error={!!rawErrors?.length}
          helperText={rawErrors?.[0]}
          slotProps={{
            htmlInput: {
              ...inputProps,
              "aria-describedby": ariaDescribedByIds(id),
              onInvalid: (event: React.FormEvent<HTMLInputElement>) => {
                event.currentTarget.setCustomValidity(
                  event.currentTarget.validity.valueMissing
                    ? REQUIRED_MESSAGE
                    : "",
                );
              },
              onInput: (event: React.FormEvent<HTMLInputElement>) => {
                event.currentTarget.setCustomValidity("");
              },
            },
          }}
        />
      )}
    />
  );
};
