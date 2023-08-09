import type { LABEL_STATUSES, LABEL_VARIANTS } from './Label.constants';

type LabelStatusTuple = typeof LABEL_STATUSES;
export type LabelStatus = LabelStatusTuple[number];

type LabelVariantTuple = typeof LABEL_VARIANTS;
export type LabelVariant = LabelVariantTuple[number];
