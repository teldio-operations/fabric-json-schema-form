import { MenuItem, Stack, Typography } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useQuery } from "@tanstack/react-query";
import { Configuration, ModulesApi } from "./api/src";
import { LoadingTextField } from "./components/LoadingTextField";
import { FabricJsonSchemaForm } from "./Form";

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

export const Queryable = (props: FieldProps<QueryRequest>) => {
  const {
    schema: { title, description },
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
    queryFn: () => modulesApi.moduleGetAppinfoConfigured(),
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

  const modulesWithQueryables = Object.fromEntries(
    Object.entries(appinfo ?? {})
      .filter(([, appinfo]) => !!appinfo.queries?.length)
      .map(([moduleId, appinfo]) => [
        moduleId,
        {
          appinfo,
          config: configs?.[moduleId],
        },
      ])
  );

  const selectedQueryable = formData?.moduleId
    ? appinfo?.[formData.moduleId]?.queries?.find(
        (q) => q.name === formData.name
      )
    : undefined;

  const value = toValue(formData?.moduleId, formData?.name) ?? "";

  const isValidValue =
    formData?.moduleId &&
    appinfo?.[formData.moduleId]?.queries?.some(
      (q) => q.name === formData?.name
    );

  return (
    <Stack>
      <LoadingTextField
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

        {Object.entries(modulesWithQueryables).map(
          ([moduleId, { appinfo, config }]) =>
            appinfo.queries?.map((query) => (
              <MenuItem
                disabled={isFetching}
                value={toValue(moduleId, query.name)}
              >
                <Stack>
                  <Stack
                    direction="row"
                    overflow="hidden"
                    alignItems="center"
                    gap={1}
                  >
                    <span>{query.title || query.name}</span>

                    {query.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {query.description}
                      </Typography>
                    )}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {config?.title ?? appinfo.title}
                  </Typography>
                </Stack>
              </MenuItem>
            ))
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
            "ui:title": "Configure query",
          }}
        />
      )}
    </Stack>
  );
};
