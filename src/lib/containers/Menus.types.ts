import type { Writable } from 'svelte/store';

export type MenuItem = {
  id: string;
  open: () => void;
  close: () => void;
  focus: () => void;
};

export type MenuBarContext = {
  openPreviousMenu?: (fromMenuItemId: string) => void;
  openNextMenu?: (fromMenuItemId: string) => void;
};

export type MenuItemContext = {
  rootMenuItemId?: string;
  depth?: number;

  register?: (menuItem: MenuItem) => void;
  unregister?: (menuItem: MenuItem) => void;

  focusPrevious?: (fromMenuItemId: string) => void;
  focusNext?: (fromMenuItemId: string) => void;

  closeMenu?: (recursive?: boolean) => void;

  onOpen?: (menuItemId: string) => void;
  onClose?: (menuItemId: string) => void;
  onSelect?: (menuItemId: string) => void;
};
