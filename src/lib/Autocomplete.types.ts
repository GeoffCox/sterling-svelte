import type { Snippet } from 'svelte';
import type { InputProps } from './Input.types';

export type AutocompleteProps = InputProps & {
  filter?: (values: string[], text: string) => string[];
  item?: Snippet<[string]>;
  values?: string[];
};
