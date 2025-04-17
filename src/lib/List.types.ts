import type { HTMLAttributes } from 'svelte/elements';

export type ListContext = {
  disabled?: boolean | null | undefined;
  selectedValue?: string;
  horizontal?: boolean | null | undefined;
};

export type ListProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  horizontal?: boolean | null;
  selectedValue?: string;
  onSelect?: (value?: string) => void;
};
