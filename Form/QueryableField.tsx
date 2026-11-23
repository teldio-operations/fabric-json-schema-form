import { MenuItem, Paper, Stack, Typography } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useMemo, useRef } from "react";
import { LoadingTextField } from "../components/LoadingTextField";
import { removeEmpty } from "../utils/data";
import { type QueryRequest, useQueryableModules } from "../utils/queryables";
import { FabricJsonSchemaForm } from "./Form";

const toValue = (moduleId?: string, name?: string) =>
  moduleId && name ? `${moduleId}/${name}` : undefined;

const fromValue = (value: string) => {
  const [moduleId, name] = value.split("/");
  return { moduleId, name };
};

type QueryableSchema = RJSFSchema & {
  accept?: string;
};

export const QueryableField = (
  props: FieldProps<QueryRequest, QueryableSchema>,
) => {
  const {
    schema: { title, description, accept },
    required,
    disabled,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField },
    },
  } = props;

  const { queryableModules, configs, getInfo, isFetching, refetch } =
    useQueryableModules(accept);

  const selectedConfig = formData?.moduleId
    ? configs?.[formData.moduleId]
    : undefined;

  const moduleDisabled = selectedConfig && selectedConfig.status === "disabled";
  const moduleHasErrors = selectedConfig && selectedConfig.status !== "online";

  const showWarning = moduleDisabled || moduleHasErrors;

  const severity = showWarning ? "warning" : undefined;
  const alert = useMemo(() => {
    if (moduleDisabled) {
      return "Module is disabled, so it will not be able to execute queries";
    }
    if (moduleHasErrors) {
      return "Module reports errors, so it may not be able to execute queries correctly.";
    }
    return undefined;
  }, [moduleDisabled, moduleHasErrors]);

  const selectedQueryable = getInfo({
    id: selectedConfig?.id,
    name: selectedConfig?.module,
  })?.queries?.find((q) => q.name === formData?.name);

  const value = toValue(formData?.moduleId, formData?.name) ?? "";

  const inputDrafts = useRef(new Map<string, QueryRequest["input"]>());

  const nothingSelected = !formData?.moduleId && !formData?.name;

  const isValidValue = selectedQueryable || nothingSelected;

  return (
    <Paper
      component={Stack}
      p={2}
      pt={selectedQueryable?.input ? 4 : 2}
      gap={2}
    >
      <LoadingTextField
        severity={severity}
        alert={alert}
        loading={isFetching}
        select
        error={!isValidValue}
        required={required}
        label={title}
        helperText={description}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          if (value && formData?.input !== undefined) {
            inputDrafts.current.set(value, formData.input);
          }

          const nextValue = e.target.value;
          const { moduleId, name } = fromValue(nextValue);

          if (moduleId && name) {
            const input = inputDrafts.current.get(nextValue);

            onChange(
              input === undefined
                ? { moduleId, name }
                : { moduleId, name, input },
              path,
            );
          }
        }}
        slotProps={{
          select: {
            onOpen: refetch,
          },
        }}
      >
        <MenuItem value="" sx={{ display: required ? "none" : undefined }}>
          <em>None</em>
        </MenuItem>

        {!isValidValue && (
          <MenuItem disabled value={value} sx={{ color: "error.main" }}>
            <em>Unknown query</em>
          </MenuItem>
        )}

        {queryableModules.map(({ id, config, queries }) =>
          queries?.map((query) => (
            <MenuItem
              key={id + query.name}
              disabled={isFetching}
              value={toValue(id, query.name)}
            >
              <Stack>
                <Stack
                  direction="row"
                  overflow="hidden"
                  alignItems="center"
                  gap={1}
                >
                  {query.title || query.name}
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {config?.title ?? config.module}
                </Typography>
              </Stack>
            </MenuItem>
          )),
        )}
      </LoadingTextField>

      {selectedQueryable?.input && (
        <FabricJsonSchemaForm
          key={value}
          tagName="div"
          schema={removeEmpty(selectedQueryable.input) as RJSFSchema}
          formData={formData?.input}
          onChange={(data) => {
            if (formData) {
              inputDrafts.current.set(value, data.formData);
              onChange({ ...formData, input: data.formData }, path);
            }
          }}
          fields={SchemaField && { SchemaField }}
          uiSchema={{
            "ui:submitButtonOptions": {
              norender: true,
            },
          }}
        />
      )}
    </Paper>
  );
};
