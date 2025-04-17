import type { HTMLAttributes } from 'svelte/elements';

export type TabListContext = {
  disabled?: boolean | null | undefined;
  selectedValue?: string | undefined;
  vertical?: boolean | null | undefined;
};

export type TabListProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  selectedValue?: string;
  vertical?: boolean | null;
  onSelect?: (value?: string) => void;
};
