import type { ComponentDocData, ParamDocData } from '../../../src/routes/(app)/documentation.types';
import { blurMethodDoc, clickMethodDoc, focusMethodDoc } from '../../_docData/shared.doc';
import Playground from './FieldPlayground.svelte';

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
  name: 'Field',
  description: 'A label container for a form element.',
  features: [
    { paragraphs: ['Wraps the interactive element with a label.'] },
    { paragraphs: ['Provides a border and background with hover, disabled, and focus states.'] },
    { paragraphs: ['Disables the label when the interactive element is disabled.'] },
    {
      paragraphs: [
        'Accepts the label `for` attribute to associate with the `id` of the interactive element.'
      ]
    },
    { paragraphs: ['An optional message can be displayed within the field border.'] },
    { paragraphs: ['The optional message can be associated with a status.'] }
  ],
  interactions: [{ paragraphs: ['Clicking on the label focuses the interactive element.'] }],
  usages: [
    {
      code: `<Field label="First Name" for="FirstName">
  <Input id="FirstName" bind:value={firstName} composed />
</Field>
`,
      description: 'Associate the Field label and Input using for and ID.'
    },
    {
      code: `<Field label="First Name">
  <Input bind:value={firstName} composed />
</Field>
`,
      description: 'Field will associate the label with the first element when for is not used.'
    }
  ],
  props: [
    { name: '(multiple)', description: 'HTMLLabelElement properties' },
    {
      name: 'forwardClick',
      type: { name: 'boolean' },
      default: 'false',
      description: 'If clicks on the label click the interactive element'
    },
    { name: 'label', type: { name: 'string' }, description: 'Text content of the label' },
    { name: 'message', type: { name: 'string' }, description: 'Text content of the field message' },
    {
      name: 'required',
      type: { name: 'boolean' },
      default: `false`,
      description: 'If the field displays a required indicator'
    },
    {
      name: 'requiredTip',
      type: { name: 'string' },
      default: `'This field is required'`,
      description: 'The tooltip for the required indicator'
    },
    {
      name: 'status',
      type: { name: 'FieldStatus', type: `'none' | 'info' | 'success' | 'warning' | 'error'` },
      default: `'none'`,
      description: 'Status of the field message'
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
