import type { MenuItemRegistration } from './Menus.types';

export const focusPreviousChild = (children: MenuItemRegistration[], fromMenuItemId: string) => {
  const index = children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
  if (index !== -1) {
    const focusIndex = index === 0 ? children.length - 1 : index - 1;
    children[focusIndex].focus();
  }
};

export const focusNextChild = (children: MenuItemRegistration[], fromMenuItemId: string) => {
  const index = children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
  if (index !== -1) {
    const focusIndex = (index + 1) % children.length;
    children[focusIndex].focus();
  }
};

export const focusFirstChild = (children: MenuItemRegistration[]) => {
  children[0]?.focus();
};

export const focusLastChild = (children: MenuItemRegistration[]) => {
  children[children.length - 1]?.focus();
};
