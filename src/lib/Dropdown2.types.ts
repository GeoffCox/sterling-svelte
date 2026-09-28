import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { Popover2Props } from './Popover2.types';

export type Dropdown2Props = HTMLAttributes<HTMLDivElement> &
  Pick<
    Popover2Props,
    'allowFlip' | 'anchorOrigin' | 'lightDismiss' | 'offsetX' | 'offsetY' | 'placement'
  > & {
    disabled?: boolean | null | undefined;
    icon?: Snippet;
    onOpen?: (open: boolean | null | undefined) => void;
    open?: boolean | null | undefined;
    value?: string | Snippet;
  };
