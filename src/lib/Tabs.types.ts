import type { Readable, Writable } from 'svelte/store';

export type TabData<T> = T & {
  tabId: string;
  text?: string;
  disabled?: boolean;
};

export type TabListContext<T> = {
  disabled: Readable<boolean>;
  selectedTabId: Writable<string | undefined>;
  selectionFollowsFocus: Readable<boolean>;
  vertical: Readable<boolean>;
};
