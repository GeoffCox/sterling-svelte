import type { MenuItemRegistration } from './MenuItem.types';

export const focusPreviousChild = (children: MenuItemRegistration[], currentValue: string) => {
  const index = children?.findIndex((menuItem) => menuItem.value === currentValue);
  if (index !== -1) {
    const focusIndex = index === 0 ? children.length - 1 : index - 1;
    children[focusIndex].focus();
  }
};

export const focusNextChild = (children: MenuItemRegistration[], currentValue: string) => {
  const index = children?.findIndex((menuItem) => menuItem.value === currentValue);
  if (index !== -1) {
    const focusIndex = (index + 1) % children.length;
    children[focusIndex].focus();
  }
};

export const focusFirstChild = (children: MenuItemRegistration[]) => {
  children?.[0]?.focus();
};

export const focusLastChild = (children: MenuItemRegistration[]) => {
  children?.[children.length - 1]?.focus();
};

export const isElementMenuItem = (candidate: Element | null | undefined) => {
  if (!candidate) return false;

  const dataValue = candidate?.getAttribute('data-value');
  const role = candidate?.getAttribute('role');

  return (
    (role === 'menuitem' || role === 'menuitemcheckbox' || role === 'menuitemradio') &&
    dataValue !== null &&
    dataValue !== undefined
  );
};

export const isElementEnabledMenuItem = (candidate: Element | null | undefined) => {
  if (!isElementMenuItem(candidate)) {
    return false;
  }
  const disabled = candidate?.getAttribute('disabled');
  return disabled === null || disabled === 'false';
};
