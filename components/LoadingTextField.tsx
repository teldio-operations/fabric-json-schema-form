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
  type Theme,
  type TooltipProps,
} from "@mui/material";
import type { ReactNode } from "react";

const getColor = (color: string | undefined, theme: Theme) => {
  if (!color) {
    return undefined;
  }
  if (
    color !== "primary" &&
    color !== "secondary" &&
    color !== "error" &&
    color !== "warning" &&
    color !== "info" &&
    color !== "success"
  ) {
    return undefined;
  }
  return theme.palette[color].main;
};

const ColoredTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ color, theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: getColor(color, theme),
    maxWidth: "none",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: getColor(color, theme),
  },
}));

const ColoredTextField = styled(TextField)(
  ({ color, theme }) =>
    color && {
      "& label": {
        color: theme.palette[color].main,
      },
      "& fieldset": {
        borderColor: theme.palette[color].main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette[color].main + " !important",
      },
    },
);

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
      <ColoredTextField
        {...props}
        slotProps={mergeSlotProps(props.slotProps, {
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
          },
        })}
      />
    </ColoredTooltip>
  );
};
