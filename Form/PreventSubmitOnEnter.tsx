import { type KeyboardEvent, type ReactNode, useCallback } from "react";

type PreventSubmitOnEnterProps = {
  disableSubmitOnEnter?: boolean;
  children: ReactNode;
};

export function PreventSubmitOnEnter(props: PreventSubmitOnEnterProps) {
  const onKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLDivElement>) => {
      if (!props.disableSubmitOnEnter) {
        return;
      }

      if (ev.key !== "Enter") {
        return;
      }

      if (!(ev.target instanceof HTMLInputElement)) {
        return;
      }

      if (ev.target.hasAttribute("aria-autocomplete")) {
        return;
      }

      ev.preventDefault();
      ev.target.blur();
    },
    [props.disableSubmitOnEnter],
  );

  return <div onKeyDown={onKeyDown}>{props.children}</div>;
}
