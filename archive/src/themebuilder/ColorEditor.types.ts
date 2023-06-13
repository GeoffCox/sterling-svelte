import type { COLOR_FORMATS } from './ColorEditor.constants';

type ColorFormatTuple = typeof COLOR_FORMATS;
export type ColorFormat = ColorFormatTuple[number];
