import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchLabelSnippet = Snippet<
  [{ checked: boolean | null | undefined; disabled: boolean | null | undefined; inputId: string }]
>;

export type SwitchProps = HTMLInputAttributes & {
  offLabel?: string | SwitchLabelSnippet;
  onLabel?: string | SwitchLabelSnippet;
  vertical?: boolean | null | undefined;
};
