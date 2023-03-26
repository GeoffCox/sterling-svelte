import { m } from 'vitest/dist/index-5aad25c1';
import type { ComponentDoc, MethodDoc } from './documentation.types';

const blurMethodDoc: MethodDoc = {
  name: 'blur',
  description: 'HTMLElement.blur'
};

const clickMethodDoc: MethodDoc = {
  name: 'click',
  description: 'HTMLElement.click'
};

const focusMethodDoc: MethodDoc = {
  name: 'focus',
  description: 'HTMLElement.focus',
  params: '(options: FocusOptions)'
};

const buttonDoc: ComponentDoc = {
  name: 'Button',
  description: 'A styled <button />',
  features: [
    {
      description: 'Set the shape of the button.'
    },
    {
      description: 'Set the style variant of the button.'
    }
  ],
  usage: [
    {
      code: `<script lang="ts">
  import Button from '@geoffcox/sterling-svelte/Button.svelte';

  const onClick = () => {
    //do something on button click
  };
</script>

<Button on:click={onClick}>sterling-svelte</Button>
`
    }
  ],
  props: [
    {
      name: 'shape',
      type: 'ButtonShape',
      default: 'rounded'
    },
    {
      name: 'variant',
      type: 'ButtonVariant',
      default: 'regular'
    }
  ],
  events: [
    {
      name: '(button)',
      description: 'HTMLButtonElement events'
    }
  ],
  methods: [blurMethodDoc, clickMethodDoc, focusMethodDoc],
  anatomy: {
    name: 'Button',
    elementType: 'button',
    children: [
      {
        name: 'default slot'
      }
    ]
  },
  slots: [
    {
      name: 'default',
      description: 'Button content',
      letParams: ['shape', 'variant']
    }
  ]
};
