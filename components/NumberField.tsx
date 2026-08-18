import {
  NumberField as BaseUINumberField,
  type NumberFieldRootChangeEventDetails,
} from "@base-ui/react/number-field";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { getUiOptions, optionsList, type FieldProps } from "@rjsf/utils";
import { useCallback, useEffect, useRef, type FocusEvent } from "react";

import { useSetFieldError } from "../utils/fieldErrorContext";

const GROUP_SEPARATOR =
  new Intl.NumberFormat()
    .formatToParts(1_000_000.1)
    .find((part) => part.type === "group")?.value || ",";

const GROUP_SEPARATOR_ERROR = `Group separators (e.g. "${GROUP_SEPARATOR}") are not allowed`;

export function NumberField({
  formData,
  onChange,
  disabled,
  readonly,
  rawErrors,
  itemID,
  fieldPathId,
  registry: { schemaUtils },
  schema,
  uiSchema,
  title,
  required,
}: FieldProps) {
  const setFieldError = useSetFieldError();

  const displaylabel = schemaUtils.getDisplayLabel(schema);
  const uiOptions = getUiOptions(uiSchema);
  const label = uiOptions.title ?? title ?? schema.title;
  const optList = optionsList(schema, uiSchema);
  const path = fieldPathId.path;
  const pathKey = path.join(".");
  const pathRef = useRef(path);
  pathRef.current = path;

  const onValueChange = useCallback(
    (val: number | null, evDetails: NumberFieldRootChangeEventDetails) => {
      const target = evDetails.event?.target;
      const rawValue = target instanceof HTMLInputElement ? target.value : "";

      const hasSeparator = rawValue.includes(GROUP_SEPARATOR);
      setFieldError(path, hasSeparator ? GROUP_SEPARATOR_ERROR : undefined);
      if (hasSeparator) {
        return;
      }

      onChange(val, path);
    },
    [onChange, path, setFieldError],
  );

  useEffect(() => {
    return () => setFieldError(pathRef.current, undefined);
  }, [pathKey, setFieldError]);

  if (optList && optList.length > 0) {
    return (
      <FormControl fullWidth>
        <InputLabel id={itemID}>{displaylabel ? label : null}</InputLabel>
        <Select
          id={itemID}
          label={displaylabel ? label : null}
          value={formData}
          onChange={(event) => onChange(event.target.value, fieldPathId.path)}
          disabled={disabled || readonly}
          error={rawErrors && rawErrors.length > 0}
          required={required}
        >
          {optList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <BNumberField
      id={itemID}
      label={displaylabel ? label : null}
      value={formData}
      onValueChange={onValueChange}
      disabled={disabled || readonly}
      error={rawErrors && rawErrors.length > 0}
      format={{ useGrouping: false }}
      required={required}
      min={schema.minimum}
      max={schema.maximum}
    />
  );
}

const BNumberField = ({
  id,
  label,
  error,
  helperText,
  size = "medium",
  ...other
}: BaseUINumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: React.ReactNode;
}) => {
  return (
    <BaseUINumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
        >
          {props.children}
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseUINumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            sx={{ pr: 0 }}
            onBlur={(ev: FocusEvent<HTMLInputElement>) => {
              // base-ui reformats/truncates the raw text on blur.
              // Skip the commit and let the invalid text stay visible.
              if (ev.target.value.includes(GROUP_SEPARATOR)) {
                ev.preventDefault();
              }
              props.onBlur?.(ev);
            }}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  flexDirection: "column",
                  maxHeight: "unset",
                  alignSelf: "stretch",
                  borderLeft: "1px solid",
                  borderColor: "divider",
                  ml: 0,
                  "& button": {
                    py: 0,
                    flex: 1,
                    borderRadius: 0.5,
                  },
                }}
              >
                <BaseUINumberField.Increment
                  render={<IconButton size={size} aria-label="Increase" />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    sx={{ transform: "translateY(2px)" }}
                  />
                </BaseUINumberField.Increment>
                <BaseUINumberField.Decrement
                  render={<IconButton size={size} aria-label="Decrease" />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    sx={{ transform: "translateY(-2px)" }}
                  />
                </BaseUINumberField.Decrement>
              </InputAdornment>
            }
          />
        )}
      />
    </BaseUINumberField.Root>
  );
};
