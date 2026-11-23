import { useMemo } from "react";
import { api } from "../api";
import { filterQueries } from "../Form/mediaType";
import { useAppinfo } from "./appinfo";

export type QueryRequest = {
  name: string;
  moduleId: string;
  input?: Record<string, unknown>;
};

export const useQueryableModules = (accept?: string) => {
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

  return { queryableModules, configs, getInfo, isFetching, refetch };
};
