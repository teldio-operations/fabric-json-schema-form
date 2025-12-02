import { ListItemText, MenuItem, Stack } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useQuery } from "@tanstack/react-query";
import { Configuration, DefaultApi, ModulesApi } from "./api/src";
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
const defaultApi = new DefaultApi(configuration);

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
    disabled,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField },
    },
  } = props;

  const {
    data: info,
    isFetching: isFetchingInfo,
    refetch: refetchInfo,
  } = useQuery({
    queryKey: ["info"],
    queryFn: () => defaultApi.getInfo(),
  });

  const {
    data: appinfo,
    isFetching: isFetchingAppinfo,
    refetch: refetchAppinfo,
  } = useQuery({
    queryKey: ["appinfo"],
    queryFn: () => modulesApi.moduleGetAppinfoConfigured(),
  });

  const {
    data: configs,
    isFetching: isFetchingConfigs,
    refetch: refetchConfigs,
  } = useQuery({
    queryKey: ["configs"],
    queryFn: () => modulesApi.getConfigs(),
  });

  const refetch = () => {
    refetchInfo();
    refetchAppinfo();
    refetchConfigs();
  };

  const isFetching = isFetchingInfo || isFetchingAppinfo || isFetchingConfigs;

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

  return (
    <Stack>
      <LoadingTextField
        loading={isFetching}
        select
        onClick={refetch}
        label={title}
        helperText={description}
        disabled={disabled}
        value={toValue(formData?.moduleId, formData?.name) ?? ""}
        onChange={(e) => {
          const { moduleId, name } = fromValue(e.target.value);
          if (moduleId && name) {
            onChange({ ...formData, moduleId, name }, path);
          }
        }}
      >
        <MenuItem value="" sx={{ display: "none" }} />

        {info?.managerPort &&
          Object.entries(modulesWithQueryables).map(
            ([moduleId, { appinfo, config }]) =>
              appinfo.queries?.map((query) => (
                <MenuItem value={toValue(moduleId, query.name)}>
                  <ListItemText
                    primary={query.name}
                    secondary={config?.title ?? appinfo.title}
                  />
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
          }}
        />
      )}
    </Stack>
  );
};
