import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DialogPlayground from '../../_playgrounds/dialog/DialogPlayground.svelte';

export const dialogDoc: ComponentDoc = {
  name: 'Dialog',
  description: 'A <dialog>: A modal, interactive content box that can be submitted or dismissed',
  comments: [
    'The dialog is always modal.',
    'The cancel event is only raised when the escape key is pressed.',
    makeExtendsComment('HTMLDialogElement')
  ],
  props: [
    {
      name: 'backdropCloses',
      type: 'boolean',
      default: 'false',
      comment: 'When true, clicking outside the dialog causes the dialog close'
    },
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the dialog is open; otherwise the dialog is closed'
    },
    {
      name: 'returnValue',
      type: 'string',
      default: "''",
      comment: 'A value indicates OK, empty indicates cancellation.'
    },
    commonProps.variant
  ],
  anatomy: `<dialog class="sterling-dialog">
  <form>
    <div class="content">
      <slot name="content">
        <div class="header">
          <slot name="header">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="close">
              <Button>
                <div class="close-x" />
              </Button>
            </div>
          </slot>
        </div>
        <div class="body">
          <slot name="body" />
        </div>
        <div class="separator" />
        <div class="footer">
          <slot name="footer" />
        </div>
      </slot>
    </div>
  </form>
</dialog>`,
  usage: DialogPlayground
};
