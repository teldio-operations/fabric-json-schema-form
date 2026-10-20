import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { getTemplate, type WidgetProps } from "@rjsf/utils";
import { useState } from "react";

export const PasswordWidget = (props: WidgetProps) => {
  const [visible, setVisible] = useState(false);
  const BaseInputTemplate = getTemplate(
    "BaseInputTemplate",
    props.registry,
    props.options,
  );

  return (
    <BaseInputTemplate
      {...props}
      type={visible && !props.disabled ? "text" : "password"}
      InputProps={{
        endAdornment: props.disabled ? undefined : (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? "Hide value" : "Show value"}
              edge="end"
              onClick={() => setVisible((shown) => !shown)}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
