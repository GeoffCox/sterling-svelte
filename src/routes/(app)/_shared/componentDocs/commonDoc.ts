import type { PropDoc } from './types';

export const makeExtendsComment = (type: string) => {
  return `Includes ${type} props, events, and methods.`;
};
