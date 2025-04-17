import type { HTMLTextareaAttributes } from 'svelte/elements';
import type { TEXT_AREA_RESIZES } from './TextArea.constants';

type TextAreaResizeTuple = typeof TEXT_AREA_RESIZES;
export type TextAreaResize = TextAreaResizeTuple[number];

export type TextAreaProps = HTMLTextareaAttributes & {
  autoHeight?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  value?: string;
  resize?: TextAreaResize;
};
