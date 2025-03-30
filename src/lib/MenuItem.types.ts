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
