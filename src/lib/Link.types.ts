import type { HTMLAnchorAttributes } from 'svelte/elements';

export type LinkProps = HTMLAnchorAttributes & {
  disabled?: boolean | null;
};
