import type { PROGRESS_ORIENTATIONS } from './Progress.constants';

type ProgressOrientationTuple = typeof PROGRESS_ORIENTATIONS;
export type ProgressOrientation = ProgressOrientationTuple[number];

import type { HTMLAttributes } from 'svelte/elements';

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  /** @deprecated Progress is not interactive and should not have disabled state. */
  disabled?: boolean | null;
  max?: number;
  percent?: number;
  value?: number;
  vertical?: boolean | null;
};
