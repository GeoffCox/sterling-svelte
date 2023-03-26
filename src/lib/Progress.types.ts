import type { PROGRESS_COLORFULS } from './Progress.constants';

type ProgressColorfulTuple = typeof PROGRESS_COLORFULS;
export type ProgressColorful = ProgressColorfulTuple[number];
