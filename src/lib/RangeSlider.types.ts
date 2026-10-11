import type { HTMLAttributes } from 'svelte/elements';

export type RangeSliderProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  min?: number;
  max?: number;
  precision?: number;
  reverse?: boolean | null;
  step?: number;
  lowValue?: number;
  highValue?: number;
  vertical?: boolean | null;
  onChange?: (value: { low?: number; high?: number }) => void;
};
