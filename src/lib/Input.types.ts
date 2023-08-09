import type { INPUT_VARIANTS } from './Input.constants';

type InputVariantTuple = typeof INPUT_VARIANTS;
export type InputVariant = InputVariantTuple[number];
