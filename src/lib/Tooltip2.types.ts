import type { Snippet } from 'svelte';
import type { Popover2Props } from './Popover2.types';

export type Tooltip2Props = Omit<Popover2Props, 'anchorCssName' | 'invokerElement'> & {
  disabled?: boolean;
  hoverDelayMilliseconds?: number;
  onOpen?: (open: boolean | null | undefined) => void;
  tip?: string | Snippet;
};
