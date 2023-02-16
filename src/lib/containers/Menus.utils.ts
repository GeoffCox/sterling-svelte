import type { MenuItem } from './Menus.types';

export const focusPreviousChild = (children: MenuItem[], fromMenuItemId: string) => {
  const index = children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
  if (index !== -1) {
    const focusIndex = index === 0 ? children.length - 1 : index - 1;
    children[focusIndex].focus();
  }
};

export const focusNextChild = (children: MenuItem[], fromMenuItemId: string) => {
  const index = children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
  if (index !== -1) {
    const focusIndex = (index + 1) % children.length;
    children[focusIndex].focus();
  }
};

export const focusFirstChild = (children: MenuItem[]) => {
  children[0]?.focus();
};

export const focusLastChild = (children: MenuItem[]) => {
  children[children.length - 1]?.focus();
};
