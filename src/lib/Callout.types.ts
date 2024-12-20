import type { HTMLAttributes } from 'svelte/elements';
import type { PopoverPlacement } from './Popover.types';

export type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  conditionalRender?: boolean | null;
  crossAxisOffset?: number;
  mainAxisOffset?: number;
  open?: boolean | null;
  placement?: PopoverPlacement;
  portalHost?: HTMLElement;
  reference?: HTMLElement | null;
};
