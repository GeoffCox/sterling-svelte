import type { HTMLAttributes } from 'svelte/elements';
import type {
  POPOVER2_ANCHOR_ORIGINS,
  POPOVER2_NONANTS,
  POPOVER2_PLACEMENTS
} from './Popover2.constants';

type Popover2AnchorOriginTuple = typeof POPOVER2_ANCHOR_ORIGINS;
export type Popover2AnchorOrigin = Popover2AnchorOriginTuple[number];

type Popover2PlacementTuple = typeof POPOVER2_PLACEMENTS;
export type Popover2Placement = Popover2PlacementTuple[number];

export type Popover2Props = HTMLAttributes<HTMLDivElement> & {
  open?: boolean | null;
  lightDismiss?: boolean | null;
  placement?: Popover2Placement;
  anchorOrigin?: Popover2AnchorOrigin;
  horizontalOffset?: number;
  verticalOffset?: number;
  anchorCssName?: string;
  invokerElement?: HTMLElement | null;
};
