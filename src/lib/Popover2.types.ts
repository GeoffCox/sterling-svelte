import type { HTMLAttributes } from 'svelte/elements';
import type { POPOVER2_NONANTS } from './Popover2.constants';

type Popover2NonantTuple = typeof POPOVER2_NONANTS;
export type Popover2Nonant = Popover2NonantTuple[number];

export type Popover2Props = HTMLAttributes<HTMLDivElement> & {
  anchor?: HTMLElement | null;
  anchorOrigin?: Popover2Nonant | 'auto';
  invoker?: HTMLElement | null;
  lightDismiss?: boolean | null;
  offsetX?: number;
  offsetY?: number;
  open?: boolean | null;
  placement?: Popover2Nonant;
};
