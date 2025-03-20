import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TextAreaPlayground from '../../_playgrounds/textarea/TextAreaPlayground.svelte';

export const textAreaDoc: ComponentDoc = {
  name: 'Textarea',
  description: 'A multi-line text input.',
  comments: [makeExtendsComment('HTMLTextAreaElement')],
  props: [
    {
      name: 'autoHeight',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the text area will resize itself vertically to fit text.'
    },
    {
      name: 'resize',
      type: 'TextAreaResize | undefined',
      default: "'none'",
      comment: 'Sets the resize handle direction.'
    }
  ],
  types: [
    {
      name: 'TextAreaResize',
      definition: "'none' | 'horizontal' | 'vertical' | 'both'"
    }
  ],
  anatomy: `<div class="sterling-text-area>
  <textarea></textarea>
</div>`,
  usage: TextAreaPlayground
};
