import type { Snippet } from 'svelte';
import type { CalloutProps } from './Callout.types';

export type TooltipProps = Omit<CalloutProps, 'reference'> & {
  disabled?: boolean;
  hoverDelayMilliseconds?: number;
  onOpen?: (open: boolean | null | undefined) => void;
  tip?: string | Snippet;
};
