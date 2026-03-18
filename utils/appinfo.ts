import { useCallback } from "react";
import { api } from "../api";
import type { Info } from "../manager-api";

export const useAppinfo = () => {
  const configured = api.useQuery("get", "/api/appinfo/configured", undefined, {
    refetchInterval: 5000,
  });
  const available = api.useQuery("get", "/api/appinfo");

  type Input = { id?: string | null; name?: string | null };

  const getInfo: (input: Input) => Info | undefined = useCallback(
    ({ id, name }) => {
      if (!id && !name) {
        return undefined;
      }

      if (id) {
        return (
          configured.data?.[id] ?? available.data?.find((a) => a.name === name)
        );
      }

      return available.data?.find((a) => a.name === name);
    },
    [available.data, configured.data],
  );

  const isLoading = configured.isLoading || available.isLoading;

  const refetch = () => {
    configured.refetch();
    available.refetch();
  };

  return { getInfo, isLoading, refetch };
};
