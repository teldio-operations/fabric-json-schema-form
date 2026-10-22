import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import {
  deepEquals,
  type ErrorSchema,
  type Field,
  type RJSFSchema,
} from "@rjsf/utils";
import { useState } from "react";
import type { QueryRequest } from "../utils/queryables";
import { FabricJsonSchemaForm } from "./Form";

export type Item = {
  name: string;
  query: QueryRequest;
  [setting: string]: unknown;
};

export type ItemConfig = {
  settings: Record<string, unknown>;
  input: Record<string, unknown>;
};

export const configOf = (item: Item, property?: string): ItemConfig => {
  const { name: _name, query, ...settings } = item;
  const input = { ...query.input };
  if (property !== undefined) {
    delete input[property];
  }
  return { settings, input };
};

export const withConfig = (
  item: Item,
  config: ItemConfig,
  property?: string,
): Item => ({
  ...structuredClone(config.settings),
  name: item.name,
  query: {
    ...item.query,
    input: {
      ...structuredClone(config.input),
      ...(property !== undefined && {
        [property]: item.query.input?.[property],
      }),
    },
  },
});

export const mostCommonConfig = (configs: ItemConfig[]) => {
  const groups: { config: ItemConfig; count: number }[] = [];
  for (const config of configs) {
    const group = groups.find((group) => deepEquals(group.config, config));
    if (group) {
      group.count++;
    } else {
      groups.push({ config, count: 1 });
    }
  }

  return groups.reduce<(typeof groups)[number] | undefined>(
    (best, group) => (!best || group.count > best.count ? group : best),
    undefined,
  )?.config;
};

type ItemConfigDialogProps = {
  title: string;
  description?: string;
  config: ItemConfig;
  settingsSchema?: RJSFSchema;
  inputSchema?: RJSFSchema;
  inputTitle: string;
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
  errors,
  SchemaField,
  onSave,
  onReset,
  onClose,
}: ItemConfigDialogProps) => {
  const [draft, setDraft] = useState(config);

  const { name: _name, query, ...settingsErrors } = errors ?? {};
  const showHeadings = settingsSchema && inputSchema;

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
