import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TextAreaPlayground from '../../_playgrounds/textarea/TextAreaPlayground.svelte';

export const textAreaDoc: ComponentDoc = {
  name: 'Textarea',
  description: 'A <textarea>: an interactive element to accept multi-line text from the user',
  comments: [makeExtendsComment('HTMLTextAreaElement')],
  props: [
    {
      name: 'autoHeight',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the text area will resize itself vertically to fit text.'
    },
    {
      name: 'resize',
      type: 'TextAreaResize',
      default: "'none'",
      comment: 'Sets the resize handle direction.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-text-area">
  <textarea />
</div>`,
  usage: TextAreaPlayground
};
