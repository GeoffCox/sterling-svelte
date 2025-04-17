import type { Snippet } from 'svelte';
import type { CalloutProps } from './Callout.types';

export type TooltipProps = Omit<CalloutProps, 'reference'> & {
  disabled?: boolean;
  hoverDelayMilliseconds?: number;
  tip?: string | Snippet;
};
