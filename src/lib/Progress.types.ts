import type { PROGRESS_ORIENTATIONS } from './Progress.constants';

type ProgressOrientationTuple = typeof PROGRESS_ORIENTATIONS;
export type ProgressOrientation = ProgressOrientationTuple[number];
