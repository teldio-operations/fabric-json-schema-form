import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip,
  type AlertColor,
  type SvgIconProps,
  type TextFieldProps,
} from "@mui/material";
import { mergeSx } from "@mui/x-date-pickers/internals";
import type { ReactNode } from "react";

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
  const AlertIcon = severity ? IconMap[severity] : undefined;

  const icon = AlertIcon ? (
    <Tooltip title={alert}>
      <AlertIcon />
    </Tooltip>
  ) : undefined;

  if (loading) {
    return (
      <TextField
        {...props}
        disabled
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
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
        sx={mergeSx(props.sx, {
          color: `${severity}.main`,
        })}
      />
    );
  }

  return <TextField {...props} />;
};
