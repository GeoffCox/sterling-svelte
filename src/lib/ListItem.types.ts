import type { HTMLAttributes } from 'svelte/elements';

export type ListItemProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  value?: string;
};
