import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  mergeSlotProps,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  type AlertColor,
  type SvgIconProps,
  type TextFieldProps,
} from "@mui/material";
import { mergeSx } from "@mui/x-date-pickers/internals";
import type { ReactNode } from "react";

const ColoredTooltip = styled(Tooltip)(({ color }) => ({
  [`& ${tooltipClasses.tooltip}`]: {
    backgroundColor: `${color}.main`,
  },
  [`& ${tooltipClasses.arrow}`]: {
    color: `${color}.main`,
  },
}));

type Props = TextFieldProps & {
  loading?: boolean;
  severity?: AlertColor;
  alert?: ReactNode;
};

const IconMap: Record<AlertColor, React.ElementType<SvgIconProps>> = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  error: Error,
};

export const LoadingTextField = ({
  loading,
  severity,
  alert,
  ...props
}: Props) => {
  if (loading) {
    return (
      <TextField
        {...props}
        disabled
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={props.select ? { pr: 2 } : undefined}
              >
                <CircularProgress size="1em" color="inherit" />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }

  const AlertIcon = severity ? IconMap[severity] : undefined;

  const icon = AlertIcon ? <AlertIcon color={severity} /> : undefined;

  return (
    <ColoredTooltip title={alert} color={severity}>
      <TextField
        {...props}
        slotProps={mergeSlotProps(props.slotProps, {
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
          },
        })}
        sx={mergeSx(props.sx, {
          "& label": {
            color: `${severity}.main`,
          },
          "& fieldset": {
            borderColor: `${severity}.main`,
          },
          "&:hover fieldset": {
            borderColor: `${severity}.main`,
          },
        })}
      />
    </ColoredTooltip>
  );
};
