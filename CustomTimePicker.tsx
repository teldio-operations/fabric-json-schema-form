import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import type { WidgetProps } from "@rjsf/utils";
import dayjs from "dayjs";

export const CustomTimePicker = (props: WidgetProps) => {
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
