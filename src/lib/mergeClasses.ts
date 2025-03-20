/** Joins classes in order into a space separated string.
 * Any falsy values are filtered out.
 */
export const mergeClasses = (...classes: (string | null | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
