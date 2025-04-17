import type { HTMLAttributes } from 'svelte/elements';

export type TreeContext = {
  disabled: boolean | null | undefined;
  expandedValues: string[];
  selectedValue: string | undefined;
};

export type TreeProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  expandedValues?: string[];
  selectedValue?: string;
  onExpandCollapse?: (expandedValues: string[]) => void;
  onSelect?: (selectedValue: string | undefined) => void;
};
