import { MenuItem, Paper, Stack, Typography } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useMemo } from "react";
import { api } from "../api";
import { LoadingTextField } from "../components/LoadingTextField";
import { useAppinfo } from "../utils/appinfo";
import { FabricJsonSchemaForm } from "./Form";
import { filterQueries } from "./mediaType";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const removeEmpty = <T extends Record<string, unknown>>(obj: T): T => {
  const newObj = {} as T;
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      if (isObject(value)) {
        const cleaned = removeEmpty(value);
        if (Object.keys(cleaned).length > 0) {
          newObj[key] = cleaned;
        }
      } else {
        newObj[key] = value;
      }
    }
  }
  return newObj;
};

const toValue = (moduleId?: string, name?: string) =>
  moduleId && name ? `${moduleId}/${name}` : undefined;

const fromValue = (value: string) => {
  const [moduleId, name] = value.split("/");
  return { moduleId, name };
};

type QueryRequest = {
  name: string;
  moduleId: string;
  input?: Record<string, unknown>;
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

  const {
    getInfo,
    isLoading: isLoadingAppinfo,
    refetch: refetchAppinfo,
  } = useAppinfo();

  const {
    data: configs,
    isPending: isFetchingConfigs,
    refetch: refetchConfigs,
  } = api.useQuery("get", "/api/config");

  const refetch = () => {
    refetchAppinfo();
    refetchConfigs();
  };

  const isFetching = isLoadingAppinfo || isFetchingConfigs;

  const queryableModules = useMemo(
    () =>
      Object.entries(configs ?? {})
        .map(([id, config]) => ({
          id,
          config,
          queries: getInfo({ id, name: config.module })?.queries?.filter(
            filterQueries(accept),
          ),
        }))
        .filter(({ queries }) => !!queries?.length),
    [accept, getInfo, configs],
  );

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
          const { moduleId, name } = fromValue(e.target.value);
          if (moduleId && name) {
            onChange({ ...formData, moduleId, name }, path);
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
          tagName="div"
          schema={removeEmpty(selectedQueryable.input) as RJSFSchema}
          formData={formData?.input}
          onChange={(data) =>
            formData && onChange({ ...formData, input: data.formData }, path)
          }
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
