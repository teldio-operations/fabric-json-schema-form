import {
  Edit,
  ExpandLess,
  ExpandMore,
  Search,
  Tune,
  Warning,
} from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import {
  deepEquals,
  type ErrorSchema,
  type FieldProps,
  type RJSFSchema,
} from "@rjsf/utils";
import {
  memo,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Queryable } from "../manager-api";
import { removeEmpty } from "../utils/data";
import { type QueryRequest, useQueryableModules } from "../utils/queryables";
import {
  configOf,
  type Device,
  type DeviceConfig,
  DeviceConfigDialog,
  mostCommonConfig,
  withConfig,
} from "./DeviceConfigDialog";

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
  inputDefaults: object;
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

const withoutProperties = (
  schema: RJSFSchema,
  removed: string[],
): RJSFSchema | undefined => {
  const properties = Object.fromEntries(
    Object.entries(schema.properties ?? {}).filter(
      ([name]) => !removed.includes(name),
    ),
  );

  if (Object.keys(properties).length === 0) {
    return undefined;
  }

  return {
    ...schema,
    properties,
    required: schema.required?.filter((name) => !removed.includes(name)),
  };
};

const defaultName = (source: Source, label: string) =>
  `${source.title} - ${label}`;

const sourceKey = ({ moduleId, name }: QueryRequest) => `${moduleId}/${name}`;

const keyOf = (source: Source) =>
  sourceKey({ moduleId: source.moduleId, name: source.queryable.name });

const revealOnHover = {
  opacity: 0,
  "&:focus-visible": { opacity: 1 },
  "@media (hover: none)": { opacity: 1 },
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
  removeAt: (index: number) => void;
  update: (change: (devices: Device[]) => Device[]) => void;
  updateAt: (index: number, change: (device: Device) => Device) => void;
  configure: (index: number) => void;
};

type DeviceNameProps = {
  name: string;
  original?: string;
  error?: string;
  warning?: boolean;
  editable: boolean;
  onRename: (name: string) => void;
};

const DeviceName = ({
  name,
  original,
  error,
  warning,
  editable,
  onRename,
}: DeviceNameProps) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <TextField
        size="small"
        label="Name"
        autoFocus
        defaultValue={name}
        error={!!error}
        onBlur={(e) => {
          setEditing(false);
          if (e.target.value !== name) {
            onRename(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          const input = e.target as HTMLInputElement;
          if (e.key === "Escape") {
            input.value = name;
          }
          if (e.key === "Enter" || e.key === "Escape") {
            e.preventDefault();
            input.blur();
          }
        }}
        sx={{ flex: 1 }}
      />
    );
  }

  return (
    <Stack direction="row" alignItems="center" gap={0.5} flex={1} minWidth={0}>
      <Stack minWidth={0}>
        <Typography
          noWrap
          color={error ? "error" : warning ? "warning.main" : undefined}
        >
          {name || <em>No name</em>}
        </Typography>
        {original && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {original}
          </Typography>
        )}
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Stack>

      {editable && (
        <IconButton
          size="small"
          aria-label="Edit name"
          onClick={() => setEditing(true)}
          sx={revealOnHover}
        >
          <Edit fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

type DeviceRowProps = {
  label: string;
  device?: Device;
  index?: number;
  source?: Source;
  option?: DeviceOption;
  configurable?: boolean;
  overridden?: boolean;
  errors?: ErrorSchema<Device>;
  unavailable?: boolean;
  disabled?: boolean;
  actions: Actions;
};

const DeviceRow = memo(function DeviceRow({
  label,
  device,
  index,
  source,
  option,
  configurable,
  overridden,
  errors,
  unavailable,
  disabled,
  actions,
}: DeviceRowProps) {
  const nameErrors = errors?.name?.__errors;
  const otherErrors = errorMessages({ ...errors, name: undefined });

  const onToggle = () => {
    if (index !== undefined) {
      actions.removeAt(index);
    } else if (source && option) {
      actions.add(source, [option]);
    }
  };

  return (
    <Stack
      sx={{
        "&:hover .MuiIconButton-root": { opacity: 1 },
        ...(unavailable && {
          border: 1,
          borderColor: "warning.main",
          borderRadius: 1,
          my: 0.5,
        }),
      }}
    >
      <Stack direction="row" alignItems="center" gap={1} minHeight={48}>
        <Checkbox checked={!!device} disabled={disabled} onChange={onToggle} />

        {unavailable && (
          <Tooltip title="The module no longer offers this device. Uncheck it to remove it.">
            <Warning color="warning" />
          </Tooltip>
        )}

        <DeviceName
          name={device?.name ?? label}
          original={
            device &&
            source &&
            !unavailable &&
            device.name !== defaultName(source, label)
              ? label
              : undefined
          }
          error={nameErrors?.[0]}
          warning={unavailable}
          editable={!!device && !disabled}
          onRename={(name) =>
            index !== undefined &&
            actions.updateAt(index, (device) => ({ ...device, name }))
          }
        />

        {configurable && index !== undefined && (
          <Tooltip
            title={
              overridden
                ? "This device overrides the module configuration"
                : "Configure this device"
            }
          >
            <IconButton
              aria-label="Configure device"
              disabled={disabled}
              color={
                otherErrors.length > 0
                  ? "error"
                  : overridden
                    ? "primary"
                    : "default"
              }
              onClick={() => actions.configure(index)}
              sx={
                overridden || otherErrors.length > 0 ? undefined : revealOnHover
              }
            >
              <Tune />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {otherErrors.map((error) => (
        <Typography key={error} variant="body2" color="error" pl={6}>
          {error}
        </Typography>
      ))}
    </Stack>
  );
}, deepEquals);

const unavailableNote = (count: number) =>
  count > 0 && (
    <Typography component="span" variant="body2" color="warning.main">
      {" "}
      · {count} unavailable
    </Typography>
  );

type DeviceSectionProps = {
  title: string;
  subtitle: ReactNode;
  count?: string;
  checkbox?: ReactNode;
  action?: ReactNode;
  searching: boolean;
  hasErrors: boolean;
  children: ReactNode;
};

const DeviceSection = ({
  title,
  subtitle,
  count,
  checkbox,
  action,
  searching,
  hasErrors,
  children,
}: DeviceSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (hasErrors) {
      setExpanded(true);
    }
  }, [hasErrors]);

  const open = expanded || searching;

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        minHeight={56}
        pr={0.5}
        bgcolor="action.selected"
      >
        {checkbox}
        <Stack
          flex={1}
          minWidth={0}
          pl={checkbox ? 0 : 1.5}
          sx={{ cursor: "pointer" }}
          onClick={() => setExpanded(!open)}
        >
          <Typography variant="subtitle1" fontWeight={500} noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        </Stack>
        {action}
        {count && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {count}
          </Typography>
        )}
        <IconButton
          aria-label={open ? "Collapse" : "Expand"}
          onClick={() => setExpanded(!open)}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      <Collapse in={open} unmountOnExit>
        <Divider />
        <Stack px={1}>{children}</Stack>
      </Collapse>
    </Paper>
  );
};

export const DeviceListField = (
  props: FieldProps<Device[], DeviceListSchema>,
) => {
  const {
    schema: { title, description, accept, items },
    disabled,
    readonly,
    rawErrors,
    errorSchema,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField },
      schemaUtils,
    },
  } = props;

  const devices = useMemo(() => formData ?? [], [formData]);
  const isDisabled = disabled || readonly;

  const settingsSchema = useMemo(
    () =>
      typeof items === "object" && !Array.isArray(items)
        ? withoutProperties(schemaUtils.retrieveSchema(items), [
            "name",
            "query",
          ])
        : undefined,
    [items, schemaUtils],
  );

  const settingsDefaults = useMemo(
    () =>
      settingsSchema
        ? ((schemaUtils.getDefaultFormState(settingsSchema) as unknown) ?? {})
        : {},
    [settingsSchema, schemaUtils],
  );

  const indexOf = (device?: Device) =>
    device ? devices.indexOf(device) : undefined;

  const errorsFor = (device?: Device) =>
    device &&
    (errorSchema?.[devices.indexOf(device)] as ErrorSchema<Device> | undefined);

  const { queryableModules, configs, isFetching } = useQueryableModules(accept);

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

          const inputSchema = withoutProperties(input, [device.property]);

          return [
            {
              moduleId: id,
              title: config.title || config.module,
              queryable,
              ...device,
              inputSchema,
              inputDefaults: inputSchema
                ? ((schemaUtils.getDefaultFormState(inputSchema) as unknown) ??
                  {})
                : {},
            },
          ];
        }),
      ),
    [queryableModules, schemaUtils],
  );

  const unavailable = isFetching
    ? []
    : devices.filter(
        (device) =>
          !sources.some((source) =>
            source.options.some((option) => isDevice(device, source, option)),
          ),
      );

  const missingSources = Map.groupBy(
    unavailable.filter(
      (device) => !sources.some((source) => isFromSource(device, source)),
    ),
    (device) => sourceKey(device.query),
  );

  const [pinnedConfigs, setPinnedConfigs] = useState(
    new Map<string, DeviceConfig>(),
  );

  const moduleConfigs = useMemo(
    () =>
      new Map(
        sources.map((source) => [
          keyOf(source),
          pinnedConfigs.get(keyOf(source)) ??
            mostCommonConfig(
              devices
                .filter((device) => isFromSource(device, source))
                .map((device) => configOf(device, source.property)),
            ) ?? {
              settings: settingsDefaults as Record<string, unknown>,
              input: source.inputDefaults as Record<string, unknown>,
            },
        ]),
      ),
    [sources, devices, pinnedConfigs, settingsDefaults],
  );

  const moduleConfig = (source: Source) => moduleConfigs.get(keyOf(source))!;

  const pinModuleConfig = (source: Source, config = moduleConfig(source)) =>
    setPinnedConfigs((pinned) => new Map(pinned).set(keyOf(source), config));

  const isOverridden = (device: Device | undefined, source: Source) =>
    !!device &&
    !deepEquals(configOf(device, source.property), moduleConfig(source));

  const isConfigurable = (source: Source) =>
    !!(settingsSchema || source.inputSchema);

  const [dialog, setDialog] = useState<
    { index: number } | { source: string } | undefined
  >();

  const latest = useRef({ devices, onChange, path, moduleConfig });
  latest.current = { devices, onChange, path, moduleConfig };

  const actions = useMemo((): Actions => {
    const update = (change: (devices: Device[]) => Device[]) => {
      const { devices, onChange, path } = latest.current;
      const next = change(devices);
      latest.current.devices = next;
      onChange(next, path);
    };

    return {
      add: (source, options) =>
        update((devices) => [
          ...devices,
          ...options.map((option) =>
            withConfig(
              {
                name: defaultName(source, option.label),
                query: {
                  moduleId: source.moduleId,
                  name: source.queryable.name,
                  input: { [source.property]: option.value },
                },
              },
              latest.current.moduleConfig(source),
              source.property,
            ),
          ),
        ]),
      remove: (source, options) =>
        update((devices) =>
          devices.filter(
            (device) =>
              !options.some((option) => isDevice(device, source, option)),
          ),
        ),
      removeAt: (index) =>
        update((devices) => devices.filter((_, i) => i !== index)),
      update,
      updateAt: (index, change) =>
        update((devices) =>
          devices.map((device, i) => (i === index ? change(device) : device)),
        ),
      configure: (index) => setDialog({ index }),
    };
  }, []);

  const closeDialog = () => setDialog(undefined);

  const renderDialog = (dialog: { index: number } | { source: string }) => {
    if ("source" in dialog) {
      const source = sources.find((source) => keyOf(source) === dialog.source);
      if (!source) {
        return null;
      }

      const previous = moduleConfig(source);
      const following = devices.filter(
        (device) =>
          isFromSource(device, source) && !isOverridden(device, source),
      );

      return (
        <DeviceConfigDialog
          title={`Configure ${source.title}`}
          description={`Applies to the ${following.length} selected devices that use the module configuration, and to devices you select later. Devices with their own configuration keep it.`}
          config={previous}
          settingsSchema={settingsSchema}
          inputSchema={source.inputSchema}
          inputTitle={`${source.queryable.title || source.queryable.name} inputs`}
          SchemaField={SchemaField}
          onClose={closeDialog}
          onSave={(config) => {
            pinModuleConfig(source, config);
            actions.update((devices) =>
              devices.map((device) =>
                isFromSource(device, source) &&
                deepEquals(configOf(device, source.property), previous)
                  ? withConfig(device, config, source.property)
                  : device,
              ),
            );
            closeDialog();
          }}
        />
      );
    }

    const device = devices[dialog.index];
    const source =
      device && sources.find((source) => isFromSource(device, source));
    if (!device || !source) {
      return null;
    }

    const save = (config: DeviceConfig) => {
      pinModuleConfig(source);
      actions.updateAt(dialog.index, (device) =>
        withConfig(device, config, source.property),
      );
      closeDialog();
    };

    return (
      <DeviceConfigDialog
        title={`Configure ${device.name}`}
        description={
          isOverridden(device, source)
            ? `This device overrides the configuration of ${source.title}.`
            : `Changes here override the configuration of ${source.title} for this device only.`
        }
        config={configOf(device, source.property)}
        settingsSchema={settingsSchema}
        inputSchema={source.inputSchema}
        inputTitle={`${source.queryable.title || source.queryable.name} inputs`}
        errors={errorsFor(device)}
        SchemaField={SchemaField}
        onClose={closeDialog}
        onSave={save}
        onReset={
          isOverridden(device, source)
            ? () => save(moduleConfig(source))
            : undefined
        }
      />
    );
  };

  const needle = search.trim().toLowerCase();

  const matches = (...texts: (string | undefined)[]) =>
    texts.some((text) => text?.toLowerCase().includes(needle));

  const hasErrors = (devices: Device[]) =>
    devices.some((device) => errorMessages(errorsFor(device)).length > 0);

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

      {!isFetching && sources.length === 0 && missingSources.size === 0 && (
        <Typography color="text.secondary">
          No module provides devices for this list.
        </Typography>
      )}

      {sources.map((source) => {
        const selected = (option: DeviceOption) =>
          devices.find((device) => isDevice(device, source, option));

        const options = source.options.filter((option) =>
          matches(source.title, option.label, selected(option)?.name),
        );

        const selectedCount = options.filter(selected).length;

        const sourceUnavailable = unavailable.filter((device) =>
          isFromSource(device, source),
        );

        const shownUnavailable = sourceUnavailable.filter((device) =>
          matches(source.title, device.name),
        );

        if (options.length === 0 && shownUnavailable.length === 0 && needle) {
          return null;
        }

        return (
          <DeviceSection
            key={`${source.moduleId}/${source.queryable.name}`}
            title={source.queryable.title || source.queryable.name}
            subtitle={
              <>
                {source.title}
                {unavailableNote(sourceUnavailable.length)}
              </>
            }
            count={`${selectedCount}/${options.length}`}
            action={
              isConfigurable(source) && (
                <Tooltip title="Configure all devices of this module">
                  <IconButton
                    aria-label="Configure module"
                    disabled={isDisabled}
                    onClick={() => setDialog({ source: keyOf(source) })}
                  >
                    <Tune />
                  </IconButton>
                </Tooltip>
              )
            }
            searching={needle !== ""}
            hasErrors={hasErrors(
              devices.filter((device) => isFromSource(device, source)),
            )}
            checkbox={
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
            }
          >
            {options.map((option) => (
              <DeviceRow
                key={JSON.stringify(option.value)}
                label={option.label}
                device={selected(option)}
                index={indexOf(selected(option))}
                configurable={isConfigurable(source)}
                overridden={isOverridden(selected(option), source)}
                errors={errorsFor(selected(option))}
                source={source}
                option={option}
                disabled={isDisabled}
                actions={actions}
              />
            ))}

            {shownUnavailable.map((device) => (
              <DeviceRow
                key={JSON.stringify(device.query)}
                label={device.name}
                device={device}
                index={indexOf(device)}
                configurable={isConfigurable(source)}
                overridden={isOverridden(device, source)}
                errors={errorsFor(device)}
                source={source}
                unavailable
                disabled={isDisabled}
                actions={actions}
              />
            ))}
          </DeviceSection>
        );
      })}

      {[...missingSources].map(([key, missing]) => {
        const { moduleId, name } = missing[0]!.query;
        const config = configs?.[moduleId];
        const moduleTitle = config?.title || config?.module || moduleId;

        const shown = missing.filter((device) =>
          matches(moduleTitle, device.name),
        );

        if (shown.length === 0) {
          return null;
        }

        return (
          <DeviceSection
            key={key}
            title={name}
            subtitle={
              <>
                {moduleTitle}
                {unavailableNote(missing.length)}
              </>
            }
            searching={needle !== ""}
            hasErrors={hasErrors(missing)}
          >
            {shown.map((device) => (
              <DeviceRow
                key={JSON.stringify(device.query)}
                label={device.name}
                device={device}
                index={indexOf(device)}
                errors={errorsFor(device)}
                unavailable
                disabled={isDisabled}
                actions={actions}
              />
            ))}
          </DeviceSection>
        );
      })}

      {dialog && renderDialog(dialog)}
    </Paper>
  );
};
