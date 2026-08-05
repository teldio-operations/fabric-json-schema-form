import type { KeyboardEvent, ReactNode } from "react";

function preventSubmitOnEnter(ev: KeyboardEvent<HTMLDivElement>) {
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
}

export function PreventSubmitOnEnter(props: { children: ReactNode }) {
  return <div onKeyDown={preventSubmitOnEnter}>{props.children}</div>;
}
