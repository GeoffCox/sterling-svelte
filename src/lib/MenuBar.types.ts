import type { HTMLAttributes } from 'svelte/elements';

export type MenuBarContext = {
  openPreviousMenuBarItem?: () => void;
  openNextMenuBarItem?: () => void;
};

export type MenuBarProps = HTMLAttributes<HTMLDivElement> & {
  onClose?: (value: string) => void;
  onOpen?: (value: string) => void;
  onSelect?: (value: string) => void;
};
