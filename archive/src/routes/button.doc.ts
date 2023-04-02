import type {
  ComponentDocData,
  MethodDocData,
  TypeDocData
} from '../../../src/routes/(app)/documentation.types';
import ButtonPlayground from '../../../src/routes/(app)/components/button/ButtonPlayground.svelte';

const blurMethodDoc: MethodDocData = {
  name: 'blur',
  description: 'HTMLElement.blur'
};

const clickMethodDoc: MethodDocData = {
  name: 'click',
  description: 'HTMLElement.click'
};

const focusMethodDoc: MethodDocData = {
  name: 'focus',
  description: 'HTMLElement.focus',
  params: [
    {
      name: 'options',
      type: {
        name: 'FocusOptions',
        type: 'object'
      }
    }
  ]
};

const buttonShapeDoc: TypeDocData = {
  name: 'ButtonShape',
  type: `'regular' | 'outline' | 'ghost'`
};

const buttonVariantDoc: TypeDocData = {
  name: 'ButtonVariant',
  type: `'circular' | 'rounded' | 'square'`
};

export const docData: ComponentDocData = {
  name: 'Button',
  description: 'A styled <button />',
  features: [
    {
      paragraphs: ['Set the shape of the button.']
    },
    {
      paragraphs: ['Set the style variant of the button.']
    }
  ],
  usages: [
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
      type: buttonShapeDoc,
      default: `'rounded'`,
      description: 'Change the shape of the button'
    },
    {
      name: 'variant',
      type: buttonVariantDoc,
      default: `'regular'`,
      description: 'Change the general style of the button'
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
    element: '<button/>',
    children: [
      {
        name: '<slot />'
      }
    ]
  },
  slots: [
    {
      name: 'default',
      description: 'Button content',
      letParams: [
        {
          name: 'shape',
          type: buttonShapeDoc
        },
        {
          name: 'variant',
          type: buttonVariantDoc
        }
      ]
    }
  ],
  playground: {
    component: ButtonPlayground
  }
};
