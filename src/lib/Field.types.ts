import type { FIELD_STATUSES } from './Field.constants';

type FieldStatusTuple = typeof FIELD_STATUSES;
export type FieldStatus = FieldStatusTuple[number];
