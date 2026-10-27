import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { ErrorSchema, Field, RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import type { Queryable } from "../manager-api";
import { FabricJsonSchemaForm } from "./Form";
import type { Item, ItemConfig, Processor, Step } from "./itemConfig";
import { filterQueries } from "./mediaType";

const processorOf = (processors: Processor[], step: Step) =>
  processors.find(
    (processor) =>
      processor.moduleId === step.moduleId &&
      processor.queryable.name === step.name,
  );

type ItemConfigDialogProps = {
  title: string;
  description?: string;
  config: ItemConfig;
  settingsSchema?: RJSFSchema;
  inputSchema?: RJSFSchema;
  inputTitle: string;
  queryable: Queryable;
  processors: Processor[];
  errors?: ErrorSchema<Item>;
  SchemaField?: Field;
  onSave: (config: ItemConfig) => void;
  onReset?: () => void;
  onClose: () => void;
};

export const ItemConfigDialog = ({
  title,
  description,
  config,
  settingsSchema,
  inputSchema,
  inputTitle,
  queryable,
  processors,
  errors,
  SchemaField,
  onSave,
  onReset,
  onClose,
}: ItemConfigDialogProps) => {
  const [draft, setDraft] = useState(config);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement>();

  const { name: _name, query, ...settingsErrors } = errors ?? {};

  const showProcessing = processors.length > 0 || draft.steps.length > 0;
  const showHeadings =
    [settingsSchema, inputSchema, showProcessing].filter(Boolean).length > 1;

  const lastStep = draft.steps.at(-1);
  const output = lastStep
    ? processorOf(processors, lastStep)?.queryable
    : queryable;
  const available = processors.filter(
    (processor) =>
      !output || !processor.accept || filterQueries(processor.accept)(output),
  );

  const setSteps = (change: (steps: Step[]) => Step[]) =>
    setDraft((draft) => ({ ...draft, steps: change(draft.steps) }));

  const nestedForm = {
    tagName: "div" as const,
    fields: SchemaField && { SchemaField },
    uiSchema: { "ui:submitButtonOptions": { norender: true } },
  };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}

          {settingsSchema && (
            <>
              {showHeadings && (
                <Typography variant="overline" color="text.secondary">
                  Settings
                </Typography>
              )}
              <FabricJsonSchemaForm
                {...nestedForm}
                schema={settingsSchema}
                formData={draft.settings}
                extraErrors={settingsErrors as ErrorSchema}
                onChange={({ formData }) =>
                  setDraft((draft) => ({ ...draft, settings: formData }))
                }
              />
            </>
          )}

          {inputSchema && (
            <>
              {showHeadings && (
                <Typography variant="overline" color="text.secondary">
                  {inputTitle}
                </Typography>
              )}
              <FabricJsonSchemaForm
                {...nestedForm}
                schema={inputSchema}
                formData={draft.input}
                extraErrors={query?.input}
                onChange={({ formData }) =>
                  setDraft((draft) => ({ ...draft, input: formData }))
                }
              />
            </>
          )}

          {showProcessing && (
            <>
              {showHeadings && (
                <Typography variant="overline" color="text.secondary">
                  Processing
                </Typography>
              )}

              {draft.steps.map((step, index) => {
                const processor = processorOf(processors, step);

                return (
                  <Paper
                    key={`${index}/${step.moduleId}/${step.name}`}
                    variant="outlined"
                    component={Stack}
                    p={1.5}
                    gap={1}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Stack flex={1} minWidth={0}>
                        <Typography noWrap>
                          {processor
                            ? processor.queryable.title ||
                              processor.queryable.name
                            : step.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={processor ? "text.secondary" : "warning.main"}
                          noWrap
                        >
                          {processor
                            ? processor.moduleTitle
                            : `${step.moduleId} · Unavailable`}
                        </Typography>
                      </Stack>
                      <IconButton
                        aria-label="Remove processing step"
                        onClick={() =>
                          setSteps((steps) =>
                            steps.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Stack>

                    {processor?.inputSchema && (
                      <FabricJsonSchemaForm
                        {...nestedForm}
                        schema={processor.inputSchema}
                        formData={step.input}
                        onChange={({ formData }) =>
                          setSteps((steps) =>
                            steps.map((step, i) =>
                              i === index ? { ...step, input: formData } : step,
                            ),
                          )
                        }
                      />
                    )}
                  </Paper>
                );
              })}

              <Stack direction="row">
                <Button
                  startIcon={<Add />}
                  disabled={available.length === 0}
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                >
                  Add processing
                </Button>
              </Stack>

              <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={() => setMenuAnchor(undefined)}
              >
                {available.map((processor) => (
                  <MenuItem
                    key={`${processor.moduleId}/${processor.queryable.name}`}
                    onClick={() => {
                      setSteps((steps) => [
                        ...steps,
                        {
                          moduleId: processor.moduleId,
                          name: processor.queryable.name,
                          property: processor.property,
                          input: structuredClone(processor.inputDefaults),
                        },
                      ]);
                      setMenuAnchor(undefined);
                    }}
                  >
                    <ListItemText
                      primary={
                        processor.queryable.title || processor.queryable.name
                      }
                      secondary={processor.moduleTitle}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {onReset && (
          <Button color="inherit" onClick={onReset} sx={{ mr: "auto" }}>
            Use module configuration
          </Button>
        )}
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSave(draft)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
