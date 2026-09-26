import type { HTMLAttributes } from 'svelte/elements';
import type { POPOVER2_FLIP_AXIS, POPOVER2_NONANTS } from './Popover2.constants';

type Popover2NonantTuple = typeof POPOVER2_NONANTS;
export type Popover2Nonant = Popover2NonantTuple[number];

type Popover2FlipAxisTuple = typeof POPOVER2_FLIP_AXIS;
export type Popover2FlipAxis = Popover2FlipAxisTuple[number];

export type Popover2Props = HTMLAttributes<HTMLDivElement> & {
  allowFlip?: Popover2FlipAxis;
  anchor?: HTMLElement | null;
  anchorOrigin?: Popover2Nonant;
  invoker?: HTMLElement | null;
  lightDismiss?: boolean | null;
  offsetX?: number;
  offsetY?: number;
  open?: boolean | null;
  placement?: 'auto' | Popover2Nonant;
};
