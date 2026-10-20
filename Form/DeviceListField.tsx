import { ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  deepEquals,
  type ErrorSchema,
  type Field,
  type FieldProps,
  type RJSFSchema,
} from "@rjsf/utils";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { Queryable } from "../manager-api";
import { removeEmpty } from "../utils/data";
import { type QueryRequest, useQueryableModules } from "../utils/queryables";
import { FabricJsonSchemaForm } from "./Form";

type Device = {
  name: string;
  query: QueryRequest;
};

type DeviceListSchema = RJSFSchema & {
  accept?: string;
};

type DeviceOption = {
  value: unknown;
  label: string;
};

type Source = {
  moduleId: string;
  title: string;
  queryable: Queryable;
  property: string;
  options: DeviceOption[];
  inputSchema?: RJSFSchema;
};

const findDeviceProperty = (input: RJSFSchema) => {
  for (const [property, schema] of Object.entries(input.properties ?? {})) {
    if (typeof schema !== "object") {
      continue;
    }

    const options = (schema.oneOf ?? []).flatMap((option) =>
      typeof option === "object" && option.const !== undefined
        ? [{ value: option.const, label: option.title ?? String(option.const) }]
        : [],
    );

    if (options.length > 0) {
      return { property, options };
    }
  }

  return undefined;
};

const withoutProperty = (
  schema: RJSFSchema,
  property: string,
): RJSFSchema | undefined => {
  const { [property]: _removed, ...properties } = schema.properties ?? {};

  if (Object.keys(properties).length === 0) {
    return undefined;
  }

  return {
    ...schema,
    properties,
    required: schema.required?.filter((name) => name !== property),
  };
};

const isFromSource = (device: Device, source: Source) =>
  device.query.moduleId === source.moduleId &&
  device.query.name === source.queryable.name;

const isDevice = (device: Device, source: Source, option: DeviceOption) =>
  isFromSource(device, source) &&
  device.query.input?.[source.property] === option.value;

const errorMessages = (errors: unknown): string[] =>
  typeof errors === "object" && errors !== null
    ? Object.entries(errors).flatMap(([key, value]) =>
        key === "__errors" ? (value as string[]) : errorMessages(value),
      )
    : [];

type Actions = {
  add: (source: Source, options: DeviceOption[]) => void;
  remove: (source: Source, options: DeviceOption[]) => void;
  removeDevice: (device: Device) => void;
  replace: (previous: Device, next: Device) => void;
};

type DeviceRowProps = {
  label: string;
  device?: Device;
  source?: Source;
  option?: DeviceOption;
  errors?: ErrorSchema<Device>;
  disabled?: boolean;
  SchemaField?: Field;
  actions: Actions;
};

const DeviceRow = memo(function DeviceRow({
  label,
  device,
  source,
  option,
  errors,
  disabled,
  SchemaField,
  actions,
}: DeviceRowProps) {
  const [expanded, setExpanded] = useState(false);

  const nameErrors = errors?.name?.__errors;
  const inputErrors = errors?.query?.input;
  const otherErrors = errorMessages({
    ...errors,
    name: undefined,
    query: { ...errors?.query, input: undefined },
  });

  const hasInputErrors = errorMessages(inputErrors).length > 0;
  useEffect(() => {
    if (hasInputErrors) {
      setExpanded(true);
    }
  }, [hasInputErrors]);

  const inputSchema = source?.inputSchema;
  const property = source?.property;

  const onToggle = () => {
    if (device) {
      actions.removeDevice(device);
    } else if (source && option) {
      actions.add(source, [option]);
    }
  };

  const onChange = (next: Device) => device && actions.replace(device, next);

  const showInput = device && inputSchema && property;

  const { [property ?? ""]: deviceValue, ...input } = device?.query.input ?? {};

  return (
    <Stack>
      <Stack direction="row" alignItems="center" gap={1} minHeight={48}>
        <Checkbox checked={!!device} disabled={disabled} onChange={onToggle} />

        <Typography flex={1} minWidth={0} noWrap>
          {label}
        </Typography>

        {device && (
          <TextField
            size="small"
            key={device.name}
            label="Name"
            error={!!nameErrors?.length}
            helperText={nameErrors?.[0]}
            disabled={disabled}
            defaultValue={device.name}
            onBlur={(e) =>
              e.target.value !== device.name &&
              onChange({ ...device, name: e.target.value })
            }
            sx={{ flex: 1 }}
          />
        )}

        {showInput && (
          <IconButton
            aria-label={expanded ? "Hide inputs" : "Show inputs"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Stack>

      {showInput && (
        <Collapse in={expanded} unmountOnExit>
          <Stack pl={6} py={1}>
            <FabricJsonSchemaForm
              tagName="div"
              disabled={disabled}
              schema={inputSchema}
              formData={input}
              extraErrors={inputErrors}
              onChange={({ formData }) =>
                onChange({
                  ...device,
                  query: {
                    ...device.query,
                    input: {
                      ...formData,
                      [property]: deviceValue,
                    },
                  },
                })
              }
              fields={SchemaField && { SchemaField }}
              uiSchema={{
                "ui:submitButtonOptions": {
                  norender: true,
                },
              }}
            />
          </Stack>
        </Collapse>
      )}

      {otherErrors.map((error) => (
        <Typography key={error} variant="body2" color="error" pl={6}>
          {error}
        </Typography>
      ))}
    </Stack>
  );
}, deepEquals);

export const DeviceListField = (
  props: FieldProps<Device[], DeviceListSchema>,
) => {
  const {
    schema: { title, description, accept },
    disabled,
    readonly,
    rawErrors,
    errorSchema,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField },
    },
  } = props;

  const devices = formData ?? [];
  const isDisabled = disabled || readonly;

  const errorsFor = (device?: Device) =>
    device &&
    (errorSchema?.[devices.indexOf(device)] as ErrorSchema<Device> | undefined);

  const { queryableModules, isFetching } = useQueryableModules(accept);

  const [search, setSearch] = useState("");

  const sources = useMemo(
    () =>
      queryableModules.flatMap(({ id, config, queries }): Source[] =>
        (queries ?? []).flatMap((queryable) => {
          if (!queryable.input) {
            return [];
          }

          const input = removeEmpty(queryable.input) as RJSFSchema;
          const device = findDeviceProperty(input);
          if (!device) {
            return [];
          }

          return [
            {
              moduleId: id,
              title: config.title || config.module,
              queryable,
              ...device,
              inputSchema: withoutProperty(input, device.property),
            },
          ];
        }),
      ),
    [queryableModules],
  );

  const unavailable = isFetching
    ? []
    : devices.filter(
        (device) =>
          !sources.some((source) =>
            source.options.some((option) => isDevice(device, source, option)),
          ),
      );

  const latest = useRef({ devices, onChange, path });
  latest.current = { devices, onChange, path };

  const actions = useMemo((): Actions => {
    const update = (change: (devices: Device[]) => Device[]) => {
      const { devices, onChange, path } = latest.current;
      onChange(change(devices), path);
    };

    return {
      add: (source, options) =>
        update((devices) => [
          ...devices,
          ...options.map((option) => ({
            name: `${source.title} - ${option.label}`,
            query: {
              moduleId: source.moduleId,
              name: source.queryable.name,
              input: { [source.property]: option.value },
            },
          })),
        ]),
      remove: (source, options) =>
        update((devices) =>
          devices.filter(
            (device) =>
              !options.some((option) => isDevice(device, source, option)),
          ),
        ),
      removeDevice: (removed) =>
        update((devices) =>
          devices.filter((device) => !deepEquals(device, removed)),
        ),
      replace: (previous, next) =>
        update((devices) =>
          devices.map((device) =>
            deepEquals(device, previous) ? next : device,
          ),
        ),
    };
  }, []);

  const needle = search.trim().toLowerCase();

  return (
    <Paper component={Stack} p={2} gap={2}>
      <Stack gap={0.5}>
        {title && <Typography variant="subtitle1">{title}</Typography>}
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {rawErrors?.map((error) => (
          <Typography key={error} variant="body2" color="error">
            {error}
          </Typography>
        ))}
      </Stack>

      <TextField
        size="small"
        placeholder="Search devices"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

      {isFetching && <LinearProgress />}

      {!isFetching && sources.length === 0 && (
        <Typography color="text.secondary">
          No module provides devices for this list.
        </Typography>
      )}

      {sources.map((source) => {
        const options = source.options.filter((option) =>
          option.label.toLowerCase().includes(needle),
        );

        const selected = (option: DeviceOption) =>
          devices.find((device) => isDevice(device, source, option));

        const selectedCount = options.filter(selected).length;

        return (
          <Stack key={`${source.moduleId}/${source.queryable.name}`}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox
                disabled={isDisabled || options.length === 0}
                checked={options.length > 0 && selectedCount === options.length}
                indeterminate={
                  selectedCount > 0 && selectedCount < options.length
                }
                onChange={() =>
                  selectedCount === options.length
                    ? actions.remove(source, options)
                    : actions.add(
                        source,
                        options.filter((option) => !selected(option)),
                      )
                }
              />
              <Stack flex={1} minWidth={0}>
                <Typography noWrap>
                  {source.queryable.title || source.queryable.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {source.title} · {selectedCount} of {options.length} selected
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            {options.map((option) => (
              <DeviceRow
                key={JSON.stringify(option.value)}
                label={option.label}
                device={selected(option)}
                errors={errorsFor(selected(option))}
                source={source}
                option={option}
                disabled={isDisabled}
                SchemaField={SchemaField}
                actions={actions}
              />
            ))}
          </Stack>
        );
      })}

      {unavailable.length > 0 && (
        <Stack>
          <Typography color="warning.main">Unavailable devices</Typography>
          <Divider />
          {unavailable.map((device) => (
            <DeviceRow
              key={JSON.stringify(device.query)}
              label="Unavailable"
              device={device}
              errors={errorsFor(device)}
              disabled={isDisabled}
              actions={actions}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
};
