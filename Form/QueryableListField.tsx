import {
  DynamicForm,
  Edit,
  ExpandLess,
  ExpandMore,
  Search,
  Tune,
  ViewList,
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
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Queryable } from "../manager-api";
import { removeEmpty } from "../utils/data";
import { type QueryRequest, useQueryableModules } from "../utils/queryables";
import { ItemConfigDialog } from "./ItemConfigDialog";
import { filterQueries } from "./mediaType";
import {
  accepts,
  type ChainProperty,
  type ItemTools,
  configOf,
  findRequestProperty,
  type Item,
  type ItemConfig,
  mostCommonConfig,
  type Processor,
  unwrap,
  withConfig,
} from "./itemConfig";

type QueryableListSchema = RJSFSchema & {
  accept?: string;
};

type LinkedRequest = {
  property: string;
  title: string;
  accept?: string;
};

type ItemOption = {
  value: unknown;
  label: string;
};

type Source = {
  moduleId: string;
  title: string;
  queryable: Queryable;
  property?: string;
  options: ItemOption[];
  inputSchema?: RJSFSchema;
  inputDefaults: object;
};

const findOptionProperty = (input: RJSFSchema) => {
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

const isFromSource = (query: QueryRequest, source: Source) =>
  query.moduleId === source.moduleId && query.name === source.queryable.name;

const isOption = (query: QueryRequest, source: Source, option: ItemOption) =>
  isFromSource(query, source) &&
  (source.property === undefined ||
    query.input?.[source.property] === option.value);

const isListValue = (value: unknown) =>
  value === undefined ||
  (Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.query?.moduleId === "string" &&
        typeof item.query?.name === "string",
    ));

const errorMessages = (errors: unknown): string[] =>
  typeof errors === "object" && errors !== null
    ? Object.entries(errors).flatMap(([key, value]) =>
        key === "__errors" ? (value as string[]) : errorMessages(value),
      )
    : [];

type Actions = {
  add: (source: Source, options: ItemOption[]) => void;
  remove: (source: Source, options: ItemOption[]) => void;
  removeAt: (index: number) => void;
  update: (change: (items: Item[]) => Item[]) => void;
  updateAt: (index: number, change: (item: Item) => Item) => void;
  configure: (index: number) => void;
};

type ItemNameProps = {
  name: string;
  original?: string;
  processing?: string;
  error?: string;
  warning?: boolean;
  editable: boolean;
  onRename: (name: string) => void;
};

const ItemName = ({
  name,
  original,
  processing,
  error,
  warning,
  editable,
  onRename,
}: ItemNameProps) => {
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
        {processing && (
          <Typography variant="caption" color="primary" noWrap>
            Processing: {processing}
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

type ItemRowProps = {
  label: string;
  item?: Item;
  index?: number;
  source?: Source;
  option?: ItemOption;
  configurable?: boolean;
  overridden?: boolean;
  processing?: string;
  errors?: ErrorSchema<Item>;
  unavailable?: boolean;
  disabled?: boolean;
  actions: Actions;
};

const ItemRow = memo(function ItemRow({
  label,
  item,
  index,
  source,
  option,
  configurable,
  overridden,
  processing,
  errors,
  unavailable,
  disabled,
  actions,
}: ItemRowProps) {
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
        <Checkbox checked={!!item} disabled={disabled} onChange={onToggle} />

        {unavailable && (
          <Tooltip title="The module no longer offers this item. Uncheck it to remove it.">
            <Warning color="warning" />
          </Tooltip>
        )}

        <ItemName
          name={item?.name ?? label}
          original={
            item &&
            source &&
            !unavailable &&
            item.name !== defaultName(source, label)
              ? label
              : undefined
          }
          processing={processing}
          error={nameErrors?.[0]}
          warning={unavailable}
          editable={!!item && !disabled}
          onRename={(name) =>
            index !== undefined &&
            actions.updateAt(index, (item) => ({ ...item, name }))
          }
        />

        {configurable && index !== undefined && (
          <Tooltip
            title={
              overridden
                ? "This item overrides the module configuration"
                : "Configure this item"
            }
          >
            <IconButton
              aria-label="Configure item"
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

type ItemSectionProps = {
  title: string;
  subtitle: ReactNode;
  count?: string;
  checkbox?: ReactNode;
  action?: ReactNode;
  searching: boolean;
  hasErrors: boolean;
  children: ReactNode;
};

const ItemSection = ({
  title,
  subtitle,
  count,
  checkbox,
  action,
  searching,
  hasErrors,
  children,
}: ItemSectionProps) => {
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

export const QueryableListField = (
  props: FieldProps<Item[], QueryableListSchema>,
) => {
  const {
    schema: { title, description, accept, items: itemSchema },
    disabled,
    readonly,
    rawErrors,
    errorSchema,
    onChange,
    formData,
    fieldPathId: { path },
    registry: {
      fields: { SchemaField, ArrayField },
      schemaUtils,
    },
  } = props;

  const isList = isListValue(formData);
  const items = useMemo(() => (isList && formData) || [], [isList, formData]);

  const { "ui:widget": _widget, ...standardUiSchema } = props.uiSchema ?? {};
  const [standard, setStandard] = useState(false);
  const showStandard = standard || !isList;
  const editorToggleLabel = showStandard
    ? "Use the list editor"
    : "Use the standard form";
  const isDisabled = disabled || readonly;

  const resolvedItemSchema = useMemo(
    () =>
      typeof itemSchema === "object" && !Array.isArray(itemSchema)
        ? schemaUtils.retrieveSchema(itemSchema)
        : undefined,
    [itemSchema, schemaUtils],
  );

  const linkedRequests = useMemo(
    () =>
      Object.entries(resolvedItemSchema?.properties ?? {}).flatMap(
        ([property, schema]): LinkedRequest[] =>
          property !== "query" &&
          typeof schema === "object" &&
          (schema as { control?: unknown }).control === "queryable"
            ? [
                {
                  property,
                  title: schema.title ?? property,
                  accept: (schema as { accept?: string }).accept,
                },
              ]
            : [],
      ),
    [resolvedItemSchema],
  );

  const settingsSchema = useMemo(
    () =>
      resolvedItemSchema &&
      withoutProperties(resolvedItemSchema, [
        "name",
        "query",
        ...linkedRequests.map((linked) => linked.property),
      ]),
    [resolvedItemSchema, linkedRequests],
  );

  const settingsDefaults = useMemo(
    () =>
      settingsSchema
        ? ((schemaUtils.getDefaultFormState(settingsSchema) as unknown) ?? {})
        : {},
    [settingsSchema, schemaUtils],
  );

  const indexOf = (item?: Item) => (item ? items.indexOf(item) : undefined);

  const errorsFor = (item?: Item) =>
    item &&
    (errorSchema?.[items.indexOf(item)] as ErrorSchema<Item> | undefined);

  const { queryableModules, configs, getInfo, isFetching } =
    useQueryableModules(accept);

  const [search, setSearch] = useState("");

  const sources = useMemo(
    () =>
      queryableModules.flatMap(({ id, config, queries }): Source[] =>
        (queries ?? []).flatMap((queryable) => {
          const input = removeEmpty(queryable.input ?? {}) as RJSFSchema;
          if (findRequestProperty(input)) {
            return [];
          }

          const picker = findOptionProperty(input) ?? {
            property: undefined,
            options: [
              { value: undefined, label: queryable.title || queryable.name },
            ],
          };

          const inputSchema = withoutProperties(
            input,
            picker.property === undefined ? [] : [picker.property],
          );

          return [
            {
              moduleId: id,
              title: config.title || config.module,
              queryable,
              ...picker,
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

  const processors = useMemo(
    () =>
      queryableModules.flatMap(({ id, config, queries }): Processor[] =>
        (queries ?? []).flatMap((queryable) => {
          const input = removeEmpty(queryable.input ?? {}) as RJSFSchema;
          const request = findRequestProperty(input);
          if (!request) {
            return [];
          }

          const [property, { accept }] = request;
          const inputSchema = withoutProperties(input, [property]);

          return [
            {
              moduleId: id,
              moduleTitle: config.title || config.module,
              queryable,
              property,
              accept,
              inputSchema,
              inputDefaults: inputSchema
                ? ((schemaUtils.getDefaultFormState(
                    inputSchema,
                  ) as unknown as Record<string, unknown>) ?? {})
                : {},
            },
          ];
        }),
      ),
    [queryableModules, schemaUtils],
  );

  const chainProperty: ChainProperty = useCallback(
    (query) =>
      processors.find(
        (processor) =>
          processor.moduleId === query.moduleId &&
          processor.queryable.name === query.name,
      )?.property,
    [processors],
  );

  const baseOf = useCallback(
    (item: Item) => unwrap(item.query, chainProperty).base,
    [chainProperty],
  );

  const linkTarget = useCallback(
    (source: Source, linked: LinkedRequest) =>
      getInfo({
        id: source.moduleId,
        name: configs?.[source.moduleId]?.module,
      })?.queries?.find(
        (queryable) =>
          queryable.name !== source.queryable.name &&
          (!linked.accept || filterQueries(linked.accept)(queryable)) &&
          (source.property === undefined ||
            (queryable.input as RJSFSchema | undefined)?.properties?.[
              source.property
            ] !== undefined),
      ),
    [getInfo, configs],
  );

  const tools = useMemo(
    (): ItemTools => ({
      chainProperty,
      linkedProperties: linkedRequests.map((linked) => linked.property),
      link: (property, base) => {
        const source = sources.find((source) => isFromSource(base, source));
        const linked = linkedRequests.find(
          (linked) => linked.property === property,
        );
        const target = source && linked && linkTarget(source, linked);
        if (!source || !target) {
          return undefined;
        }

        return {
          moduleId: base.moduleId,
          name: target.name,
          input:
            source.property === undefined
              ? {}
              : { [source.property]: base.input?.[source.property] },
        };
      },
    }),
    [chainProperty, linkedRequests, sources, linkTarget],
  );

  const linkedFor = (source: Source) =>
    linkedRequests.map((linked) => ({
      property: linked.property,
      title: linked.title,
      available: !!linkTarget(source, linked),
    }));

  const unavailable = isFetching
    ? []
    : items.filter(
        (item) =>
          !sources.some((source) =>
            source.options.some((option) =>
              isOption(baseOf(item), source, option),
            ),
          ),
      );

  const missingSources = Map.groupBy(
    unavailable.filter(
      (item) => !sources.some((source) => isFromSource(baseOf(item), source)),
    ),
    (item) => sourceKey(baseOf(item)),
  );

  const [pinnedConfigs, setPinnedConfigs] = useState(
    new Map<string, ItemConfig>(),
  );

  const moduleConfigs = useMemo(
    () =>
      new Map(
        sources.map((source) => [
          keyOf(source),
          pinnedConfigs.get(keyOf(source)) ??
            mostCommonConfig(
              items
                .filter((item) => isFromSource(baseOf(item), source))
                .map((item) => configOf(item, source.property, tools)),
            ) ?? {
              settings: settingsDefaults as Record<string, unknown>,
              input: source.inputDefaults as Record<string, unknown>,
              steps: [],
              linked: [],
            },
        ]),
      ),
    [sources, items, pinnedConfigs, settingsDefaults, baseOf, tools],
  );

  const moduleConfig = (source: Source) => moduleConfigs.get(keyOf(source))!;

  const pinModuleConfig = (source: Source, config = moduleConfig(source)) =>
    setPinnedConfigs((pinned) => new Map(pinned).set(keyOf(source), config));

  const isOverridden = (item: Item | undefined, source: Source) =>
    !!item &&
    !deepEquals(configOf(item, source.property, tools), moduleConfig(source));

  const processingOf = (item?: Item) =>
    item &&
    unwrap(item.query, chainProperty)
      .steps.map((step) => {
        const processor = processors.find(
          (processor) =>
            processor.moduleId === step.moduleId &&
            processor.queryable.name === step.name,
        );
        return processor
          ? processor.queryable.title || processor.queryable.name
          : step.name;
      })
      .join(" → ");

  const isConfigurable = (source: Source, item?: Item) =>
    !!(
      settingsSchema ||
      source.inputSchema ||
      processors.some((processor) => accepts(processor, source.queryable)) ||
      linkedRequests.some((linked) => linkTarget(source, linked)) ||
      processingOf(item)
    );

  const [dialog, setDialog] = useState<
    { index: number } | { source: string } | undefined
  >();

  const latest = useRef({
    items,
    onChange,
    path,
    moduleConfig,
    baseOf,
    tools,
  });
  latest.current = {
    items,
    onChange,
    path,
    moduleConfig,
    baseOf,
    tools,
  };

  const actions = useMemo((): Actions => {
    const update = (change: (items: Item[]) => Item[]) => {
      const { items, onChange, path } = latest.current;
      const next = change(items);
      latest.current.items = next;
      onChange(next, path);
    };

    return {
      add: (source, options) =>
        update((items) => [
          ...items,
          ...options.map((option) =>
            withConfig(
              {
                name: defaultName(source, option.label),
                query: {
                  moduleId: source.moduleId,
                  name: source.queryable.name,
                  input:
                    source.property === undefined
                      ? {}
                      : { [source.property]: option.value },
                },
              },
              latest.current.moduleConfig(source),
              source.property,
              latest.current.tools,
            ),
          ),
        ]),
      remove: (source, options) =>
        update((items) =>
          items.filter(
            (item) =>
              !options.some((option) =>
                isOption(latest.current.baseOf(item), source, option),
              ),
          ),
        ),
      removeAt: (index) =>
        update((items) => items.filter((_, i) => i !== index)),
      update,
      updateAt: (index, change) =>
        update((items) =>
          items.map((item, i) => (i === index ? change(item) : item)),
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
      const following = items.filter(
        (item) =>
          isFromSource(baseOf(item), source) && !isOverridden(item, source),
      );

      return (
        <ItemConfigDialog
          title={`Configure ${source.title}`}
          description={`Applies to the ${following.length} selected items that use the module configuration, and to items you select later. Items with their own configuration keep it.`}
          config={previous}
          settingsSchema={settingsSchema}
          inputSchema={source.inputSchema}
          inputTitle={`${source.queryable.title || source.queryable.name} inputs`}
          queryable={source.queryable}
          processors={processors}
          linked={linkedFor(source)}
          SchemaField={SchemaField}
          onClose={closeDialog}
          onSave={(config) => {
            pinModuleConfig(source, config);
            actions.update((items) =>
              items.map((item) =>
                isFromSource(baseOf(item), source) &&
                deepEquals(configOf(item, source.property, tools), previous)
                  ? withConfig(item, config, source.property, tools)
                  : item,
              ),
            );
            closeDialog();
          }}
        />
      );
    }

    const item = items[dialog.index];
    const source =
      item && sources.find((source) => isFromSource(baseOf(item), source));
    if (!item || !source) {
      return null;
    }

    const save = (config: ItemConfig) => {
      pinModuleConfig(source);
      actions.updateAt(dialog.index, (item) =>
        withConfig(item, config, source.property, tools),
      );
      closeDialog();
    };

    return (
      <ItemConfigDialog
        title={`Configure ${item.name}`}
        description={
          isOverridden(item, source)
            ? `This item overrides the configuration of ${source.title}.`
            : `Changes here override the configuration of ${source.title} for this item only.`
        }
        config={configOf(item, source.property, tools)}
        settingsSchema={settingsSchema}
        inputSchema={source.inputSchema}
        inputTitle={`${source.queryable.title || source.queryable.name} inputs`}
        queryable={source.queryable}
        processors={processors}
        linked={linkedFor(source)}
        errors={errorsFor(item)}
        SchemaField={SchemaField}
        onClose={closeDialog}
        onSave={save}
        onReset={
          isOverridden(item, source)
            ? () => save(moduleConfig(source))
            : undefined
        }
      />
    );
  };

  const needle = search.trim().toLowerCase();

  const matches = (...texts: (string | undefined)[]) =>
    texts.some((text) => text?.toLowerCase().includes(needle));

  const hasErrors = (items: Item[]) =>
    items.some((item) => errorMessages(errorsFor(item)).length > 0);

  return (
    <Paper component={Stack} p={2} gap={2}>
      <Stack direction="row" alignItems="flex-start" gap={1}>
        <Stack gap={0.5} flex={1} minWidth={0}>
          {!showStandard && (
            <>
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
            </>
          )}
          {!isList && (
            <Typography variant="body2" color="warning.main">
              This value cannot be shown in the list editor. Fix it in the
              standard form.
            </Typography>
          )}
        </Stack>

        <Tooltip title={editorToggleLabel}>
          <span>
            <IconButton
              aria-label={editorToggleLabel}
              disabled={!isList}
              onClick={() => setStandard(!standard)}
            >
              {showStandard ? <ViewList /> : <DynamicForm />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {showStandard ? (
        ArrayField && <ArrayField {...props} uiSchema={standardUiSchema} />
      ) : (
        <>
          <TextField
            size="small"
            placeholder="Search"
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
              No module provides items for this list.
            </Typography>
          )}

          {sources.map((source) => {
            const selected = (option: ItemOption) =>
              items.find((item) => isOption(baseOf(item), source, option));

            const options = source.options.filter((option) =>
              matches(source.title, option.label, selected(option)?.name),
            );

            const selectedCount = options.filter(selected).length;

            const sourceUnavailable = unavailable.filter((item) =>
              isFromSource(baseOf(item), source),
            );

            const shownUnavailable = sourceUnavailable.filter((item) =>
              matches(source.title, item.name),
            );

            if (
              options.length === 0 &&
              shownUnavailable.length === 0 &&
              needle
            ) {
              return null;
            }

            return (
              <ItemSection
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
                    <Tooltip title="Configure all items of this module">
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
                  items.filter((item) => isFromSource(baseOf(item), source)),
                )}
                checkbox={
                  <Checkbox
                    disabled={isDisabled || options.length === 0}
                    checked={
                      options.length > 0 && selectedCount === options.length
                    }
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
                  <ItemRow
                    key={String(JSON.stringify(option.value))}
                    label={option.label}
                    item={selected(option)}
                    index={indexOf(selected(option))}
                    configurable={isConfigurable(source, selected(option))}
                    overridden={isOverridden(selected(option), source)}
                    processing={processingOf(selected(option))}
                    errors={errorsFor(selected(option))}
                    source={source}
                    option={option}
                    disabled={isDisabled}
                    actions={actions}
                  />
                ))}

                {shownUnavailable.map((item) => (
                  <ItemRow
                    key={JSON.stringify(item.query)}
                    label={item.name}
                    item={item}
                    index={indexOf(item)}
                    configurable={isConfigurable(source, item)}
                    overridden={isOverridden(item, source)}
                    processing={processingOf(item)}
                    errors={errorsFor(item)}
                    source={source}
                    unavailable
                    disabled={isDisabled}
                    actions={actions}
                  />
                ))}
              </ItemSection>
            );
          })}

          {[...missingSources].map(([key, missing]) => {
            const { moduleId, name } = baseOf(missing[0]!);
            const config = configs?.[moduleId];
            const moduleTitle = config?.title || config?.module || moduleId;

            const shown = missing.filter((item) =>
              matches(moduleTitle, item.name),
            );

            if (shown.length === 0) {
              return null;
            }

            return (
              <ItemSection
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
                {shown.map((item) => (
                  <ItemRow
                    key={JSON.stringify(item.query)}
                    label={item.name}
                    item={item}
                    index={indexOf(item)}
                    errors={errorsFor(item)}
                    unavailable
                    disabled={isDisabled}
                    actions={actions}
                  />
                ))}
              </ItemSection>
            );
          })}

          {dialog && renderDialog(dialog)}
        </>
      )}
    </Paper>
  );
};
