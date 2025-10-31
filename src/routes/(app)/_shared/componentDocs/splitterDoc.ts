import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import SplitterPlayground from '../../_playgrounds/splitter/SplitterPlayground.svelte';

export const splitterDoc: ComponentDoc = {
  name: 'Splitter',
  description: 'Provides relative resizing between two panes.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'horizontal',
      type: 'boolean | null | undefined',
      default: 'undefined',
      comment: 'When true, the panes are split top and bottom.'
    },
    {
      name: 'initialPrimarySize',
      type: 'CssSizeUnit | undefined',
      default: '50%',
      comment: 'The initial size of the primary pane.'
    },
    {
      name: 'minPrimarySize',
      type: 'CssSizeUnit | undefined',
      default: 'undefined',
      comment: 'The minimize width or height of the primary pane.'
    },
    {
      name: 'minSecondarySize',
      type: 'CssSizeUnit | undefined',
      default: 'undefined',
      comment: 'The minimize width or height of the secondary pane.'
    },
    {
      name: 'primary',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The content within the primary pane.'
    },
    {
      name: 'secondary',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The content within the secondary pane.'
    },
    {
      name: 'split',
      type: 'Snippet | undefined',
      default: '<div class="default-split-line></div>',
      comment: 'The visual split between the panes.'
    },
    {
      name: 'resetOnDoubleClick',
      type: 'boolean | null | undefined',
      default: 'undefined',
      comment:
        'When true, double-clicking the split will reset the primary pane to the initial primary size.'
    }
  ],
  types: [
    {
      name: 'CssSizeUnit',
      definition: 'A CSS length (e.g. 120px, 4em, 20ch, 2cm) or CSS percentage (e.g. 25%).'
    }
  ],
  anatomy: `<div class="sterling-splitter">
    <div class="primary">
      {@render primary()}
    </div>
    <div class="split">
      {#if split}
        {@render split()}
      {:else}
        <div class="default-split-line"></div>
      {/if}
    </div>
    <div class="secondary">
      {@render secondary()}
    </div>
</div>`,
  usage: SplitterPlayground
};
