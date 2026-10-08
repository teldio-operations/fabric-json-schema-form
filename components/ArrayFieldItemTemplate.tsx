import { Box, Paper } from "@mui/material";
import {
  getTemplate,
  getUiOptions,
  type ArrayFieldItemTemplateProps,
} from "@rjsf/utils";

export const ArrayFieldItemTemplate = ({
  children,
  buttonsProps,
  hasToolbar,
  uiSchema,
  registry,
}: ArrayFieldItemTemplateProps) => {
  const ArrayFieldItemButtonsTemplate = getTemplate(
    "ArrayFieldItemButtonsTemplate",
    registry,
    getUiOptions(uiSchema),
  );

  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      {children}
      {hasToolbar && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}
        >
          <ArrayFieldItemButtonsTemplate {...buttonsProps} />
        </Box>
      )}
    </Paper>
  );
};
