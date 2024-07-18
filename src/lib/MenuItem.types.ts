import type { Writable } from 'svelte/store';
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
  /**
   * If the menu item is a top-level item in a menu bar
   */
  isMenuBarItem?: boolean;
  /**
   * The menu item values for the chain of open menus.
   */
  openValues: Writable<string[]>;
  rootValue?: string;
  depth?: number;

  closeContainingMenu?: () => void;

  onOpen?: (value: string) => void;
  onClose?: (value: string) => void;
  onSelect?: (value: string) => void;
};
