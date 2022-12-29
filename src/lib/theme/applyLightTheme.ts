import type { ThemeActionParams } from './types';
import { applyTheme } from './applyTheme';
import { lightTheme } from './lightTheme';

/**
 * Applies the default light theme.
 */
export const applyLightTheme = (node: HTMLElement, params?: Omit<ThemeActionParams, 'theme'>) => {
	return applyTheme(node, { ...params, theme: lightTheme });
};
