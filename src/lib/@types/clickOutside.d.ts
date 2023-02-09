declare namespace svelte.JSX {
  type ClickOutsideEventDetail = {
    mouseEvent: MouseEvent;
  };

  type ClickOutsideEvent = CustomEvent<ClickOutsideEventDetail>;

  interface DOMAttributes<T> {
    onclick_outside?: (e: ClickOutsideEvent) => void;
  }
}
