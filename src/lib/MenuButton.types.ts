import type { PopoverPlacement } from './Popover.types';
import type { ButtonProps } from './Button.types';
import type { Snippet } from 'svelte';

export type MenuButtonProps = ButtonProps & {
  items: Snippet;
  menuClass?: string;
  onOpen?: (value: string) => void;
  onClose?: (value: string) => void;
  onSelect?: (value: string) => void;
  open?: boolean | null | undefined;
  popoverPlacement?: PopoverPlacement;
  value?: string;
};
