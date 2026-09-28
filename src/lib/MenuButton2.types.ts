import type { ButtonProps } from './Button.types';
import type { Snippet } from 'svelte';
import type { Popover2Nonant, Popover2Props } from './Popover2.types';

export type MenuButton2Props = ButtonProps &
  Pick<
    Popover2Props,
    'allowFlip' | 'anchorOrigin' | 'lightDismiss' | 'offsetX' | 'offsetY' | 'placement'
  > & {
    items: Snippet;
    menuClass?: string;
    onOpen?: (value: string) => void;
    onClose?: (value: string) => void;
    onSelect?: (value: string) => void;
    open?: boolean | null | undefined;
    value?: string;
  };
