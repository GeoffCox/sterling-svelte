import type { LABEL_STATUSES } from './Label.constants';

type LabelStatusTuple = typeof LABEL_STATUSES;
export type LabelStatus = LabelStatusTuple[number];
