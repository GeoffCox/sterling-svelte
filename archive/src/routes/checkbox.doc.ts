import type {
  ComponentDocData,
  MethodDocData,
  TypeDocData
} from '../../../src/routes/(app)/documentation.types';
import { blurMethodDoc, clickMethodDoc, focusMethodDoc } from '../../_docData/shared.doc';
import Playground from '../../../src/routes/(app)/components/checkbox/CheckboxPlayground.svelte';

export const docData: ComponentDocData = {
  name: 'Checkbox',
  description: 'A styled <input type="checkbox" />',
  features: [
    {
      paragraphs: ['Add label content to describe the checkbox.']
    }
  ],
  usages: [
    {
      code: `<script lang="ts">
  import Checkbox from '@geoffcox/sterling-svelte/Checkbox.svelte';
    
  let checked = false;
    
  const onChange = () => {
    //do something on the change
  };
</script>
    
<Checkbox bind:checked on:change={onChange}>sterling-svelte</Checkbox>
`
    }
  ],
  props: [
    {
      name: '<input />',
      description: 'HTMLInputElement props'
    }
  ],
  events: [
    {
      name: '<input />',
      description: 'HTMLInputElement events'
    }
  ],
  methods: [blurMethodDoc, clickMethodDoc, focusMethodDoc],
  anatomy: {
    name: 'Checkbox',
    element: '<div/>',
    children: [
      {
        name: 'hidden',
        element: '<input />'
      },
      {
        name: 'checkmark',
        element: '<div />'
      },
      {
        name: 'label',
        element: '<Label />',
        children: [
          {
            name: 'label content',
            element: '<slot />',
            children: [
              {
                name: '{value}'
              }
            ]
          }
        ]
      }
    ]
  },
  slots: [
    {
      name: 'default',
      description: 'Checkbox label content',
      letParams: [
        {
          name: 'checked',
          type: { name: 'boolean' }
        },
        {
          name: 'disabled',
          type: { name: 'boolean' }
        },
        {
          name: 'inputId',
          type: { name: 'string' }
        },
        {
          name: 'value',
          type: { name: 'string' }
        }
      ]
    }
  ],
  playground: {
    component: Playground
  }
};
