import type { POPOVER_PLACEMENTS } from './Popover.constants';

type PopoverPlacementTuple = typeof POPOVER_PLACEMENTS;
export type PopoverPlacement = PopoverPlacementTuple[number];
