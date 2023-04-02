import type { ComponentDocData, ParamDocData } from '../../../src/routes/(app)/documentation.types';
import { blurMethodDoc, clickMethodDoc, focusMethodDoc } from '../../_docData/shared.doc';
import Playground from '../../../src/routes/(app)/components/dropdown/DropdownPlayground.svelte';

const letParams: ParamDocData[] = [
  {
    name: 'composed',
    type: { name: 'boolean' }
  },
  {
    name: 'disabled',
    type: { name: 'boolean' }
  },
  {
    name: 'open',
    type: { name: 'boolean' }
  }
];

export const docData: ComponentDocData = {
  name: 'Dropdown',
  description: 'A styled <input type="checkbox" />',
  features: [
    {
      paragraphs: ['Define any content for the value and popup.']
    },
    {
      paragraphs: ['The dropown is dynamically positioned based on avaiable screen space.']
    }
  ],
  interactions: [
    { paragraphs: ['Clicking the button opens/closes the dropdown.'] },
    { paragraphs: ['Clicking the value opens/closes the dropdown.'] },
    { paragraphs: ['Clicking outside the dropdown closes the dropdown.'] },
    { paragraphs: ['Pressing the escape key closes the dropdown.'] }
  ],
  usages: [
    {
      code: `<script lang="ts">
  let open = false;
  let low = 5;
  let high = 500;
</script>
    
<Dropdown bind:open>
  <div slot="value">
    Delta {high - low}
  </div>
  <div>
    <Slider bind:value={low} max={0} />
    <Slider bind:value={high} min={101} max={200} />
  </div>
</Dropdown>
`
    }
  ],
  props: [
    {
      name: '(multiple)',
      description: 'HTMLDivElement props'
    },
    {
      name: 'composed           ',
      type: { name: 'boolean' },
      default: 'false',
      description:
        'When true, the component should be styled to be hosted within a container component.'
    },
    {
      name: 'disabled           ',
      type: { name: 'boolean' },
      default: 'false',
      description: 'When true, the component is disabled.'
    },
    {
      name: 'open               ',
      type: { name: 'boolean' },
      default: 'false',
      description: 'When true, the dropdown is opened.'
    },
    {
      name: 'stayOpenOnClickAway',
      type: { name: 'boolean' },
      default: 'false',
      description: 'When true and clicking outside the dropdown, it remains open.'
    }
  ],
  events: [
    {
      name: '(multiple)',
      description: 'HTMLDivElement events'
    },
    {
      name: 'open',
      args: [
        {
          name: 'open',
          type: { name: 'boolean' }
        }
      ],
      description: 'Raised when the dropdown is opened or closed.'
    }
  ],
  methods: [blurMethodDoc, clickMethodDoc, focusMethodDoc],
  anatomy: {
    name: 'Dropdown',
    element: '<div/>',
    children: [
      {
        name: 'value',
        element: '<slot name="value" />'
      },
      {
        name: 'button',
        element: '<slot name="button" />'
      },
      {
        name: 'dropdown',
        element: '<div />',
        children: [
          {
            name: 'dropdown content',
            element: '<slot />'
          }
        ]
      }
    ]
  },
  slots: [
    {
      name: 'button',
      description: 'The button that opens and closes the dropdown.',
      letParams: letParams
    },
    {
      name: 'default',
      description: 'The content to display within the dropdown.',
      letParams: letParams
    },
    {
      name: 'value',
      description: 'The content to display with the button.',
      letParams: letParams
    }
  ],
  playground: {
    component: Playground
  }
};
