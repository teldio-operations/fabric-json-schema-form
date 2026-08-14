import type { FieldPathList } from "@rjsf/utils";
import { createContext, useContext } from "react";

export type SetFieldError = (
  path: FieldPathList,
  message: string | undefined,
) => void;

export const FieldErrorContext = createContext<SetFieldError>(() => {});

export function useSetFieldError(): SetFieldError {
  return useContext(FieldErrorContext);
}
