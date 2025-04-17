import type { Snippet } from 'svelte';
import type { HTMLDialogAttributes } from 'svelte/elements';

export type DialogProps = HTMLDialogAttributes & {
  backdropCloses?: boolean | null | undefined;
  body?: Snippet;
  content?: Snippet;
  footer?: Snippet;
  header?: Snippet;
  returnValue?: string;
  headerTitle?: string | Snippet;
};
