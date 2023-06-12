import type { COLOR_FORMATS } from './ColorPicker.constants';

type ColorFormatTuple = typeof COLOR_FORMATS;
export type ColorFormat = ColorFormatTuple[number];
