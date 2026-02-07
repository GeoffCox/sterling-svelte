import type { HTMLAttributes } from 'svelte/elements';

export type SliderProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean | null;
  min?: number;
  max?: number;
  precision?: number;
  reverse?: boolean | null;
  step?: number;
  value?: number;
  vertical?: boolean | null;
  onChange?: (value?: number) => void;
};
