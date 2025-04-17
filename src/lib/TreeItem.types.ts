import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type TreeItemContext = {
  depth: number;
  disabled: boolean | null | undefined;
};

export type TreeItemProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null | undefined;
  icon?: Snippet;
  label?: string | Snippet;
  value: string;
};
