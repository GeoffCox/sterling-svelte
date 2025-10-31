import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type SplitterChangeArgs = {
  percent?: number;
  primarySize?: number;
  secondarySize?: number;
  dragging?: boolean;
};

export type SplitterProps = HTMLAttributes<HTMLDivElement> & {
  horizontal?: boolean | null;
  initialPrimarySize?: string;
  minPrimarySize?: string;
  minSecondarySize?: string;
  resetOnDoubleClick?: boolean | null;
  primary?: Snippet;
  split?: Snippet;
  secondary?: Snippet;
  change?: (value: SplitterChangeArgs) => void;
};
