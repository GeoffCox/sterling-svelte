import type { MethodDocData } from '../documentation.types';

export const blurMethodDoc: MethodDocData = {
  name: 'blur',
  description: 'HTMLElement.blur'
};

export const clickMethodDoc: MethodDocData = {
  name: 'click',
  description: 'HTMLElement.click'
};

export const focusMethodDoc: MethodDocData = {
  name: 'focus',
  description: 'HTMLElement.focus',
  params: [
    {
      name: 'options',
      type: {
        name: 'FocusOptions',
        type: 'object'
      }
    }
  ]
};
