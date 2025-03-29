import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import PaginationPlayground from '../../_playgrounds/pagination/PaginationPlayground.svelte';

export const paginationDoc: ComponentDoc = {
  name: 'Pagination',
  description: 'An a navigation list of page numbers.',
  comments: [
    'Page numbers are positioned in the following order: first, step-previous, previous, current, next, step-next, last.',
    'The previous, next, step-previous, and step-next buttons support holding down the mouse button to continuously move.',
    'Page numbers are evenly spaced based on the number of digits in itemCount.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'itemCount',
      type: 'number',
      default: '0',
      comment: 'The total number of items across all pages.'
    },
    {
      name: 'itemRange',
      type: `$bindable({index: number; count: number;})`,
      default: 'undefined',
      comment:
        'The range of items expected to be displayed on the current page. This is a read-only property.'
    },
    {
      name: 'page',
      type: '$bindable(number)',
      default: '0',
      comment: 'The current page, starting at 1.'
    },
    {
      name: 'pageCount',
      type: '$bindable(number)',
      default: 'undefined',
      comment: 'The number of pages based on itemCount and pageSize. This is a read-only property.'
    },
    {
      name: 'pageSize',
      type: 'number | undefined',
      default: '1',
      comment:
        'The number of items to display on each page. Set to one if you have pages of content rather than items.'
    },
    {
      name: 'pageStep',
      type: 'number | undefined',
      default: '10',
      comment:
        'How many pages to move when the step previous button or step next button is clicked.'
    },
    {
      name: 'onChange',
      type: '((page: number, itemRange: {index: number; count: number;}) => void) | undefined',
      default: 'undefined',
      comment: 'Called when page changes. Includes the range of items on the page.'
    },
    {
      name: 'firstNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 1.'
    },
    {
      name: 'stepPreviousNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 2. Defaults to <<.'
    },
    {
      name: 'previousNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 3.'
    },
    {
      name: 'currentNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 4. Defaults to an input.'
    },
    {
      name: 'nextNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 5.'
    },
    {
      name: 'stepNextNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 6. Defaults to >>.'
    },
    {
      name: 'lastNumber',
      type: '(Snippet<[number]>) | undefined',
      default: 'undefined',
      comment: 'A snippet to render a page number at position 7.'
    }
  ],
  usage: PaginationPlayground,
  anatomy: `<div class="sterling-pagination">
  <div class="page-number first">
    <button>
      {@render pageNumber(firstNumber, 'first')}
    </button>
  </div>
  <div class="page-number step-previous">
    <button>
      {@render pageNumber(stepPreviousNumber, 'step-previous')}
    </button>
  </div>
  <div class="page-number previous">
    <button>
      {@render pageNumber(previousNumber, 'previous')}
    </button>
  </div>
  <div class="page-number current">
    <button>
      {@render pageNumber(currentNumber, 'current')}
    </button>
  </div>
  <div class="page-number next">
    <button>
      {@render pageNumber(nextNumber, 'next')}
    </button>
  </div>
  <div class="page-number step-next">
    <button>
      {@render pageNumber(stepNextNumber, 'step-next')}
    </button>
  </div>
  <div class="page-number last">
    <button>
      {@render pageNumber(lastNumber, 'last')}
    </button>
  </div>
</div>`
};
