export type MenuBarContext = {
  openPreviousMenu: () => void;
  openNextMenu: () => void;
};

export type MenuItemContext = {
  rootMenuItemId: string;
  closeMenu: () => void;
  closeParent: () => void;
  onSelect: (menuItemId: string) => void;
};
