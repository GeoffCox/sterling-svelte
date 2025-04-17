import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { MENU_ITEM_ROLES } from './MenuItem.constants';

type MenuItemRoleTuple = typeof MENU_ITEM_ROLES;
export type MenuItemRole = MenuItemRoleTuple[number];

export type MenuItemRegistration = {
  value: string;
  open: () => void;
  close: () => void;
  focus: () => void;
};

export type MenuItemContext = {
  isMenuBarItem?: boolean;
  openValues: string[];
  rootValue?: string;
  depth?: number;
  closeContainingMenu?: () => void;
  onOpen?: (value: string) => void;
  onClose?: (value: string) => void;
  onSelect?: (value: string) => void;
};

export type MenuItemProps = HTMLButtonAttributes & {
  checked?: boolean | null;
  item?: Snippet;
  menuClass?: string;
  onClose?: (value: string) => void;
  onOpen?: (value: string) => void;
  onSelect?: (value: string) => void;
  role?: MenuItemRole;
  shortcut?: string | Snippet;
  text?: string | Snippet;
  value: string;
};
