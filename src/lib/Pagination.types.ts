import { type Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  itemCount: number;
  readonly itemRange?: { index: number; count: number };
  page?: number;
  readonly pageCount?: number;
  pageSize?: number;
  pageStep?: number;
  onChange?: (page: number, itemRange: { index: number; count: number }) => void;
  firstNumber?: Snippet<[number]>;
  stepPreviousNumber?: Snippet<[number]>;
  previousNumber?: Snippet<[number]>;
  currentNumber?: Snippet<[number]>;
  nextNumber?: Snippet<[number]>;
  stepNextNumber?: Snippet<[number]>;
  lastNumber?: Snippet<[number]>;
};
