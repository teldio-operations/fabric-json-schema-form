import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import type { IconButtonProps } from "@rjsf/utils";

export const RemoveButton = ({
  id,
  className,
  disabled,
  onClick,
}: IconButtonProps) => (
  <Button
    id={id}
    className={className}
    color="error"
    size="small"
    startIcon={<DeleteIcon />}
    disabled={disabled}
    onClick={onClick}
  >
    Remove
  </Button>
);
