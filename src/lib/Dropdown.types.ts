import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type DeprecatedProps = {
  /** @deprecated Use icon instead. */
  button?: Snippet;
  /** @deprecated Use icon instead. */
  buttonIcon?: Snippet;
};

export type DropdownProps = HTMLAttributes<HTMLDivElement> &
  DeprecatedProps & {
    disabled?: boolean | null | undefined;
    open?: boolean | null | undefined;
    stayOpenOnClickAway?: boolean | null | undefined;
    onOpen?: (open: boolean | null | undefined) => void;
    icon?: Snippet;
    value?: string | Snippet;
  };
