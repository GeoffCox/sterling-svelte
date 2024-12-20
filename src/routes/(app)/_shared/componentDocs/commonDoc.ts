import type { PropDoc } from './types';

export const commonProps: Record<string, PropDoc> = {
  variant: {
    name: 'variant',
    type: 'string',
    default: "''",
    comment: 'Additional class names to apply'
  }
};

export const makeExtendsComment = (type: string) => {
  return `Includes ${type} props, events, and methods.`;
};
