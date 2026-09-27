import type { ButtonProps } from './Button.types';
import type { Snippet } from 'svelte';
import type { Popover2Nonant, Popover2Props } from './Popover2.types';

export type MenuButton2Props = ButtonProps &
  Pick<Popover2Props, 'allowFlip'> & {
    items: Snippet;
    menuClass?: string;
    onOpen?: (value: string) => void;
    onClose?: (value: string) => void;
    onSelect?: (value: string) => void;
    open?: boolean | null | undefined;
    menuAnchorOrigin?: Popover2Nonant;
    menuPlacement?: 'auto' | Popover2Nonant;
    value?: string;
  };
