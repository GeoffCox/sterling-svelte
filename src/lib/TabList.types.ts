import type { Readable, Writable } from 'svelte/store';

/**
 * The context for a TabList and its tabs.
 */
export type TabListContext = {
  /** When true, the tablist and its tabs are disabled. */
  disabled: Readable<boolean>;

  /** The value of the currently selected tab. */
  selectedValue: Writable<string | undefined>;

  /** When true, the tabs are displayed vertically. */
  vertical: Readable<boolean>;
};
