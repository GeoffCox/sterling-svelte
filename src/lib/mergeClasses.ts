import type { ClassValue } from 'svelte/elements';

/** Joins classes in order into a space separated string.
 * Any falsy values are filtered out.
 */
export const mergeClasses = (...classes: (ClassValue | string | null | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
