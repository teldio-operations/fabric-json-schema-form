import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getUiOptions, optionsList, type FieldProps } from "@rjsf/utils";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
// eslint-disable-next-line
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = "Input";

const BNumberField = ({
  id: idProp,
  label,
  error,
  size = "medium",
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
}) => {
  const id = idProp;
  return (
    <BaseNumberField.Root
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
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
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
                <BaseNumberField.Increment
                  render={<IconButton size={size} aria-label="Increase" />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    sx={{ transform: "translateY(2px)" }}
                  />
                </BaseNumberField.Increment>

                <BaseNumberField.Decrement
                  render={<IconButton size={size} aria-label="Decrease" />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    sx={{ transform: "translateY(-2px)" }}
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            sx={{ pr: 0 }}
          />
        )}
      />
    </BaseNumberField.Root>
  );
};

export default function NumberField(props: FieldProps) {
  const {
    formData,
    onChange,
    disabled,
    readonly,
    rawErrors,
    itemID,
    fieldPathId,
    registry,
    schema,
    uiSchema,
    title,
    required,
  } = props;
  const { schemaUtils } = registry;
  const displaylabel = schemaUtils.getDisplayLabel(schema);
  const uiOptions = getUiOptions(uiSchema);
  const label = uiOptions.title ?? title ?? schema.title;
  const optList = optionsList(schema, uiSchema);

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
      onValueChange={(value) => onChange(value, fieldPathId.path)}
      disabled={disabled || readonly}
      error={rawErrors && rawErrors.length > 0}
      format={{
        useGrouping: false,
      }}
      required={required}
    />
  );
}
