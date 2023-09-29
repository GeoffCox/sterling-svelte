import type { EventHandler } from 'svelte/elements';

export type ClickOutsideEventDetail = {
  mouseEvent: MouseEvent;
};

export type ClickOutsideEvent = CustomEvent<ClickOutsideEventDetail>;

declare module 'svelte/elements' {
  export interface DOMAttributes<T extends EventTarget> {
    'on:click_outside'?: EventHandler<ClickOutsideEvent, T>;
  }
}

export {}; // ensure this is not an ambient module, else types will be overridden instead of augmented
