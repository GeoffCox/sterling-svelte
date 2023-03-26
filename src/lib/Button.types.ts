import type { BUTTON_SHAPES, BUTTON_VARIANTS } from './Button.constants';

type ButtonShapeTuple = typeof BUTTON_SHAPES;
export type ButtonShape = ButtonShapeTuple[number];

type ButtonVariantTuple = typeof BUTTON_VARIANTS;
export type ButtonVariant = ButtonVariantTuple[number];
