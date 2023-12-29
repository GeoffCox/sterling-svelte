import type { Keyborg } from 'keyborg';

import { onMount } from 'svelte';
import { writable } from 'svelte/store';

import { createKeyborg } from 'keyborg';

export const usingKeyboard = writable(false, (set) => {
  let keyborg: Keyborg | undefined = undefined;
  const keyborgHandler = (value: boolean) => {
    set(value);
  };

  onMount(() => {
    keyborg = createKeyborg(window);
    set(keyborg.isNavigatingWithKeyboard());
    keyborg.subscribe(keyborgHandler);
  });

  return () => {
    keyborg?.unsubscribe(keyborgHandler);
  };
});
