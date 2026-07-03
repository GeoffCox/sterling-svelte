import type { HTMLAttributes } from 'svelte/elements';
import type { POPOVER2_NONANTS } from './Popover2.constants';

type Popover2NonantTuple = typeof POPOVER2_NONANTS;
export type PopoverNonant = Popover2NonantTuple[number];

export type Popover2AnchorOrigin = PopoverNonant;
export type Popover2Placement = PopoverNonant;

export type Popover2Props = HTMLAttributes<HTMLDivElement> & {
  open?: boolean | null;
  lightDismiss?: boolean;
  placement?: Popover2Placement;
  anchorCssName?: string;
  anchorOrigin?: Popover2AnchorOrigin;
  horizontalOffset?: number;
  verticalOffset?: number;
  invokerReference?: HTMLElement;
};
