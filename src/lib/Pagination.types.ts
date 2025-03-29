import { type Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  itemCount: number;
  itemRange?: { index: number; count: number };
  page?: number;
  pageCount?: number;
  pageSize?: number;
  pageStep?: number;
  onChange?: (page?: number, itemRange?: { index: number; count: number }) => void;
  firstNumber?: Snippet<[number | undefined]>;
  stepPreviousNumber?: Snippet<[number | undefined]>;
  previousNumber?: Snippet<[number | undefined]>;
  currentNumber?: Snippet<[number | undefined]>;
  nextNumber?: Snippet<[number | undefined]>;
  stepNextNumber?: Snippet<[number | undefined]>;
  lastNumber?: Snippet<[number | undefined]>;
};
