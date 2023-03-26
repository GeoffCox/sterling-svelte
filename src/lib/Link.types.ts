import type { LINK_VARIANTS } from './Link.constants';

type LinkVariantTuple = typeof LINK_VARIANTS;
export type LinkVariant = LinkVariantTuple[number];
