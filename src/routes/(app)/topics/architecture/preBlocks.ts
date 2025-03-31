// Svelte has a bug where it will think some Svelte code within string literals is code
// when placed within a .svelte file.  They are placed here as a workaround.
export const preBlocks = {
  callback: `onSelect?: (selectedValue: string | undefined) => void;`
};
