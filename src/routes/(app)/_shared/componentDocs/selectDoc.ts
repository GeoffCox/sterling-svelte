import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SelectPlayground from '../../_playgrounds/select/SelectPlayground.svelte';

export const selectDoc: ComponentDoc = {
  name: 'Select',
  description: 'A value and a button to open/close a list of choices.',
  comments: [
    'Due to lack of styling capabilities with <select>, the Select component does not use <select>',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'buttonSnippet',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The snippet to render the button. Defaults to a chevron.'
    },
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: "When true, the select's button is disabled and list is closed."
    },
    {
      name: 'listClass',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'Additional class names to apply to the list.'
    },
    {
      name: 'onPending',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when a value is selected in the list but not yet committed.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when a value is selected.'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: "When true, the select's dropdown is open."
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the selected item.'
    },
    {
      name: 'valueSnippet',
      type: 'Snippet<[string | undefined]> | undefined',
      default: 'undefined',
      comment:
        'The snippet to render the value. Passed the selected value. Defaults to the selected value (string).'
    }
  ],
  methods: [
    {
      name: 'scrollToSelectedItem',
      comment: 'Scrolls to the selected item.'
    }
  ],
  anatomy: `select (<div>)
  value (<div>)
    value (Snippet) | selectedValue (string) | &nbsp;
  button (<div>)
    button (Snippet) | chevron (<div>)
  popover (<Popover>)
    content <div>)
      list (<List>)
        children (Snippet)`,
  usage: SelectPlayground
};
