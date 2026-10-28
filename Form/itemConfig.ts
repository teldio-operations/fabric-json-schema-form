import { deepEquals, type RJSFSchema } from "@rjsf/utils";
import type { Queryable } from "../manager-api";
import type { QueryRequest } from "../utils/queryables";
import { filterQueries } from "./mediaType";

export type Item = {
  name: string;
  query: QueryRequest;
  [setting: string]: unknown;
};

export type Step = {
  moduleId: string;
  name: string;
  property: string;
  input: Record<string, unknown>;
};

export type ItemConfig = {
  settings: Record<string, unknown>;
  input: Record<string, unknown>;
  steps: Step[];
  linked: string[];
};

export type Processor = {
  moduleId: string;
  moduleTitle: string;
  queryable: Queryable;
  property: string;
  accept?: string;
  inputSchema?: RJSFSchema;
  inputDefaults: Record<string, unknown>;
};

export const accepts = (processor: Processor, output?: Queryable) =>
  !output || !processor.accept || filterQueries(processor.accept)(output);

export type ChainProperty = (query: QueryRequest) => string | undefined;

export type ItemTools = {
  chainProperty: ChainProperty;
  linkedProperties: string[];
  link: (property: string, base: QueryRequest) => QueryRequest | undefined;
};

export const findRequestProperty = (input: RJSFSchema) =>
  Object.entries(input.properties ?? {}).find(
    ([, schema]) =>
      typeof schema === "object" &&
      (schema as { control?: unknown }).control === "queryable",
  ) as [string, RJSFSchema & { accept?: string }] | undefined;

const isRequest = (value: unknown): value is QueryRequest =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as QueryRequest).moduleId === "string" &&
  typeof (value as QueryRequest).name === "string";

export const unwrap = (query: QueryRequest, chainProperty: ChainProperty) => {
  const steps: Step[] = [];
  let base = query;

  for (;;) {
    const input = base.input ?? {};
    const property =
      chainProperty(base) ??
      Object.keys(input).find((key) => isRequest(input[key]));
    const inner = property === undefined ? undefined : input[property];
    if (property === undefined || !isRequest(inner)) {
      return { base, steps };
    }

    const { [property]: _inner, ...stepInput } = input;
    steps.unshift({
      moduleId: base.moduleId,
      name: base.name,
      property,
      input: stepInput,
    });
    base = inner;
  }
};

export const wrap = (base: QueryRequest, steps: Step[]): QueryRequest =>
  steps.reduce<QueryRequest>(
    (inner, step) => ({
      moduleId: step.moduleId,
      name: step.name,
      input: { ...step.input, [step.property]: inner },
    }),
    base,
  );

export const configOf = (
  item: Item,
  property: string | undefined,
  tools: ItemTools,
): ItemConfig => {
  const { name: _name, query, ...settings } = item;
  const { base, steps } = unwrap(query, tools.chainProperty);
  const input = { ...base.input };
  if (property !== undefined) {
    delete input[property];
  }
  const linked = tools.linkedProperties.filter(
    (linked) => settings[linked] !== undefined,
  );
  for (const linked of tools.linkedProperties) {
    delete settings[linked];
  }
  return { settings, input, steps, linked };
};

export const withConfig = (
  item: Item,
  config: ItemConfig,
  property: string | undefined,
  tools: ItemTools,
): Item => {
  const { base } = unwrap(item.query, tools.chainProperty);
  const linked = Object.fromEntries(
    config.linked.flatMap((linked) => {
      const request = tools.link(linked, base);
      return request ? [[linked, request]] : [];
    }),
  );

  return {
    ...structuredClone(config.settings),
    ...linked,
    name: item.name,
    query: wrap(
      {
        ...base,
        input: {
          ...structuredClone(config.input),
          ...(property !== undefined && {
            [property]: base.input?.[property],
          }),
        },
      },
      structuredClone(config.steps),
    ),
  };
};

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
