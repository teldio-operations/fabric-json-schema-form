import { MenuItem, Paper, Stack, Typography } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Configuration,
  ModulesApi,
  type Queryable as QueryableType,
} from "../api/src";
import { LoadingTextField } from "../components/LoadingTextField";
import { FabricJsonSchemaForm } from "./Form";
import { useCallback, useMemo } from "react";

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

const configuration = new Configuration({
  basePath: "",
});

const modulesApi = new ModulesApi(configuration);

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

const notNullOrUndefined = <T,>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

const parseAccept = (accept?: string) => {
  return (
    accept
      ?.split(",")
      .map((p) => p.trim())
      .map((i) => i.split("/"))
      .map(([type, subtype]) => [type, subtype?.split(";")].flat())
      .map(([type, subtype, ...parameters]) => ({
        type,
        subtype,
        parameters: parameters.filter(notNullOrUndefined),
      })) ?? []
  );
};

const filterQueries = (accept?: string) => {
  const accepted = parseAccept(accept);

  return (q: QueryableType) => {
    const [baseType] = q.mediaType.split(";");
    const [type, subtype] = baseType?.split("/") ?? [];

    for (const { type: acceptedType, subtype: acceptedSubtype } of accepted) {
      if (!!acceptedType && acceptedType !== "*" && type !== acceptedType) {
        continue;
      }

      if (
        !!acceptedSubtype &&
        acceptedSubtype !== "*" &&
        subtype !== acceptedSubtype
      ) {
        continue;
      }

      return true;
    }

    return false;
  };
};

export const Queryable = (props: FieldProps<QueryRequest, QueryableSchema>) => {
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
    data: appinfo,
    isPending: isFetchingAppinfo,
    refetch: refetchAppinfo,
  } = useQuery({
    queryKey: ["appinfo"],
    queryFn: () => modulesApi.getAppinfo(),
  });

  const {
    data: configs,
    isPending: isFetchingConfigs,
    refetch: refetchConfigs,
  } = useQuery({
    queryKey: ["configs"],
    queryFn: () => modulesApi.getConfigs(),
  });

  const refetch = () => {
    refetchAppinfo();
    refetchConfigs();
  };

  const isFetching = isFetchingAppinfo || isFetchingConfigs;

  const queryableModules = useMemo(
    () =>
      Object.entries(configs ?? {})
        .map(([id, config]) => ({
          id,
          config,
          queries: appinfo
            ?.find(({ name }) => name === config.name)
            ?.queries?.filter(filterQueries(accept)),
        }))
        .filter(({ queries }) => !!queries?.length),
    [accept, appinfo, configs],
  );

  const selectedConfig = formData?.moduleId
    ? configs?.[formData.moduleId]
    : undefined;

  const notRunning = selectedConfig && !selectedConfig.running;

  const severity = notRunning ? "warning" : undefined;
  const alert = notRunning
    ? "Module is not running currently, so it will not be able to execute queries"
    : undefined;

  const selectedQueryable = appinfo
    ?.find(({ name }) => name === selectedConfig?.name)
    ?.queries?.find((q) => q.name === formData?.name);

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
                  {config?.title ?? config.name}
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
