import type { HTMLAttributes } from 'svelte/elements';

export type TreeChevronProps = HTMLAttributes<HTMLDivElement> & {
  expanded?: boolean | null | undefined;
  hasChildren?: boolean | null | undefined;
};
