import type { Keyborg } from 'keyborg';
import { createKeyborg } from 'keyborg';

import { writable } from 'svelte/store';

export const usingKeyboard = writable(false, (set) => {
  let keyborg: Keyborg = createKeyborg(window);

  set(keyborg.isNavigatingWithKeyboard());

  const keyborgHandler = (value: boolean) => {
    set(value);
  };

  keyborg.subscribe(keyborgHandler);

  return () => {
    keyborg.unsubscribe(keyborgHandler);
  };
});
