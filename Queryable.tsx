import { ListItemText, MenuItem, Stack, TextField } from "@mui/material";
import type { FieldProps, RJSFSchema } from "@rjsf/utils";
import { useQuery } from "@tanstack/react-query";
import { Configuration, DefaultApi, ModulesApi } from "./api/src";
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

const toValue = (port: number, moduleId: string, queryName: string) =>
  `http://localhost:${port}/a/${moduleId}/${queryName}`;

const fromValue = (value: string) => {
  if (typeof value !== "string") {
    return {};
  }

  const match = /http:\/\/localhost:\d+\/a\/(.+)\/(.+)/.exec(value);
  if (!match) {
    return {};
  }
  const [, moduleId, queryName] = match;

  return {
    moduleId,
    queryName,
  };
};

type QueryableValue = {
  endpoint: string;
  input?: Record<string, unknown>;
};

export const Queryable = (props: FieldProps<QueryableValue>) => {
  const {
    label,
    disabled,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField },
    },
  } = props;

  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: () => defaultApi.getInfo(),
  });

  const { data: appinfo } = useQuery({
    queryKey: ["appinfo"],
    queryFn: () => modulesApi.moduleGetAppinfoConfigured(),
  });

  const { data: configs } = useQuery({
    queryKey: ["configs"],
    queryFn: () => modulesApi.getConfigs(),
  });

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

  const { moduleId, queryName } = fromValue(formData?.endpoint ?? "");

  if (moduleId) {
    console.log("moduleId: ", moduleId);
  }
  if (queryName) {
    console.log("queryName: ", queryName);
  }

  const selectedQueryable = moduleId
    ? appinfo?.[moduleId]?.queries?.find((q) => q.name === queryName)
    : undefined;

  if (selectedQueryable) {
    console.log("selectedQueryable: ", selectedQueryable);
  }

  console.log("value: ", formData);

  return (
    <Stack>
      <TextField
        select
        label={props.label}
        disabled={disabled}
        value={formData?.endpoint ?? ""}
        onChange={(e) =>
          onChange({ ...formData, endpoint: e.target.value }, path)
        }
      >
        <MenuItem value=""></MenuItem>

        {info?.managerPort &&
          Object.entries(modulesWithQueryables).map(
            ([moduleId, { appinfo, config }]) =>
              appinfo.queries?.map((query) => (
                <MenuItem
                  value={toValue(info.managerPort, moduleId, query.name)}
                >
                  <ListItemText
                    primary={query.name}
                    secondary={config?.title ?? appinfo.title}
                  />
                </MenuItem>
              ))
          )}
      </TextField>

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
