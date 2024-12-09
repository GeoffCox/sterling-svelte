import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DialogPlayground from '../../_playgrounds/dialog/DialogPlayground.svelte';

export const dialogDoc: ComponentDoc = {
  name: 'Dialog',
  description: 'A modal, interactive content box that can be submitted or dismissed',
  comments: [
    'The dialog is always modal.',
    'The cancel event is only raised when the escape key is pressed.',
    makeExtendsComment('HTMLDialogElement')
  ],
  props: [
    {
      name: 'backdropCloses',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, clicking outside the dialog causes the dialog to close.'
    },
    {
      name: 'body',
      type: 'Snippet| undefined',
      default: 'undefined',
      comment: 'The body within the dialog content.'
    },
    {
      name: 'content',
      type: 'Snippet| undefined',
      default: 'undefined',
      comment: 'The entire content of the dialog. Defaults to header, body, and footer snippets.'
    },
    {
      name: 'footer',
      type: 'Snippet| undefined',
      default: 'undefined',
      comment: 'The footer within the dialog content.'
    },
    {
      name: 'header',
      type: 'Snippet| undefined',
      default: 'undefined',
      comment: 'The header within the dialog content. Defaults to headerTitle and close button.'
    },
    {
      name: 'headerTitle',
      type: 'string | Snippet| undefined',
      default: 'undefined',
      comment: 'The title within the header.'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the dialog is open; otherwise the dialog is closed'
    },
    {
      name: 'returnValue',
      type: 'string | undefined',
      default: "''",
      comment: 'A value indicates OK, empty indicates cancellation.'
    },
    commonProps.variant
  ],
  anatomy: `dialog (<dialog>)
  form (<form>)
    content (<div>)
      content (Snippet)
        header (<div>)
          header (Snippet)
            title (<div>)
              headerTitle (string | Snippet)
            close (Button)
              close-x (<div>)
        body (<div>)
          body (Snippet)
        separator (<div>)
        footer (<div>)
          footer (Snippet)`,
  usage: DialogPlayground
};
