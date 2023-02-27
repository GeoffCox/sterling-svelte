export type MenuItemRegistration = {
  value: string;
  open: () => void;
  close: () => void;
  focus: () => void;
};

export type MenuBarContext = {
  openPreviousMenu?: (currentValue: string) => void;
  openNextMenu?: (currentValue: string) => void;
};

export type MenuItemContext = {
  rootValue?: string;
  depth?: number;

  register?: (menuItem: MenuItemRegistration) => void;
  unregister?: (menuItem: MenuItemRegistration) => void;

  focusPrevious?: (currentValue: string) => void;
  focusNext?: (currentValue: string) => void;

  closeMenu?: (recursive?: boolean) => void;

  onOpen?: (value: string) => void;
  onClose?: (value: string) => void;
  onSelect?: (value: string) => void;
};
