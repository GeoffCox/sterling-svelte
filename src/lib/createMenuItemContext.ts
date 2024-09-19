import type { MenuItemContext } from './MenuItem.types';

export const createMenuItemContext = (initial: MenuItemContext) => {
  let openValues = $state(initial.openValues);

  return {
    ...initial,
    get openValues() {
      return openValues;
    },
    set openValues(value) {
      openValues = value;
    }
  };
};
