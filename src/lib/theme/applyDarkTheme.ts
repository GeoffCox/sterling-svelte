import type { ThemeActionParams } from './types';
import { applyTheme } from './applyTheme';
import { darkTheme } from './darkTheme';

/**
 * Applies the default dark theme.
 */
export const applyDarkTheme = (node: HTMLElement, params?: Omit<ThemeActionParams, 'theme'>) => {
	return applyTheme(node, { ...params, theme: darkTheme });
};
