import type { TEXT_AREA_RESIZES } from './TextArea.constants';

type TextAreaResizeTuple = typeof TEXT_AREA_RESIZES;
export type TextAreaResize = TextAreaResizeTuple[number];
