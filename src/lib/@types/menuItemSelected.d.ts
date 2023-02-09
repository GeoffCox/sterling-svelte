declare namespace svelte.JSX {
  type MenuItemSelectedEventDetail = {
    menuItemId: string;
  };

  type MenuItemSelectedEvent = CustomEvent<MenuItemSelectedEventDetail>;

  interface DOMAttributes<T> {
    onmenuitem_selected?: (e: MenuItemSelectedEvent) => void;
  }

  interface MenuItem<T> {
    onmenuitem_selected?: (e: MenuItemSelectedEvent) => void;
  }
}
