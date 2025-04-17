import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type DeprecatedProps = {
  /** @deprecated Use icon instead */
  buttonSnippet?: Snippet;

  /** @deprecated Use value instead */
  valueSnippet?: Snippet<[string | undefined]>;
};

export type SelectProps = HTMLAttributes<HTMLDivElement> &
  DeprecatedProps & {
    disabled?: boolean | null;
    icon?: Snippet;
    listClass?: string;
    onPending?: (value?: string) => void;
    onSelect?: (value?: string) => void;
    open?: boolean | null;
    selectedValue?: string;
    value?: string | Snippet<[string | undefined]>;
  };
