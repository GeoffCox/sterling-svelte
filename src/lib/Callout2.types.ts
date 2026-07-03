import type { PopoverPlacement } from './Popover.types';
import type { Popover2Props } from './Popover2.types';

export type Callout2Props = Popover2Props & {
  conditionalRender?: boolean | null;
  crossAxisOffset?: number;
  mainAxisOffset?: number;
  open?: boolean | null;
  placement?: PopoverPlacement;
  portalHost?: HTMLElement;
  reference?: HTMLElement | null;
};
