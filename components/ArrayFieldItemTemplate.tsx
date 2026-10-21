import { Box, Paper } from "@mui/material";
import {
  getTemplate,
  getUiOptions,
  type ArrayFieldItemTemplateProps,
} from "@rjsf/utils";

import { RemoveButton } from "./RemoveButton";

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
  const buttonsRegistry = {
    ...registry,
    templates: {
      ...registry.templates,
      ButtonTemplates: { ...registry.templates.ButtonTemplates, RemoveButton },
    },
  };

  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      {children}
      {hasToolbar && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}
        >
          <ArrayFieldItemButtonsTemplate
            {...buttonsProps}
            registry={buttonsRegistry}
          />
        </Box>
      )}
    </Paper>
  );
};
