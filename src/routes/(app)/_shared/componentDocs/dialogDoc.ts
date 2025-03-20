import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DialogPlayground from '../../_playgrounds/dialog/DialogPlayground.svelte';

export const dialogDoc: ComponentDoc = {
  name: 'Dialog',
  description: 'A modal, interactive content box that can be submitted or dismissed.',
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
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The body within the dialog content.'
    },
    {
      name: 'content',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The entire content of the dialog. Defaults to header, body, and footer snippets.'
    },
    {
      name: 'footer',
      type: 'Snippet | undefined',
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
      type: 'string | Snippet | undefined',
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
  anatomy: `<dialog class="sterling-dialog">
  <form>
    <div class="content">
      {#if content}
        {@render content()}
      {:else}
        <div class="header">
          {@render header()}
          <div class="title">
            {@render headerTitle()}
          </div>
          <div class="close">
            <Button>
              <div class="close-x">
              </div>
            </Button>
          </div>
        </div>
        <div class="body">
          {@render body()}
        </div>
        <div class="separator"></div>
        <div class="footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </form>
</dialog>`,
  usage: DialogPlayground
};
