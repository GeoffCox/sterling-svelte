import type { HTMLAttributes } from 'svelte/elements';
import type { POPOVER_PLACEMENTS } from './Popover.constants';

type PopoverPlacementTuple = typeof POPOVER_PLACEMENTS;
export type PopoverPlacement = PopoverPlacementTuple[number];

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  conditionalRender?: boolean;
  crossAxisOffset?: number;
  mainAxisOffset?: number;
  open?: boolean | null;
  placement?: PopoverPlacement;
  portalHost?: HTMLElement;
  reference?: HTMLElement;
};
