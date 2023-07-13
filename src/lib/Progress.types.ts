import type { PROGRESS_STATUSES } from './Progress.constants';

type ProgressStatusTuple = typeof PROGRESS_STATUSES;
export type ProgressStatus = ProgressStatusTuple[number];
