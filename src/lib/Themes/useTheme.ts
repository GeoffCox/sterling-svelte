/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';

const applyTheme = (node: HTMLElement, cssVars: CSSVarSet) => {
	Object.keys(cssVars).map((key) => {
		node.style.setProperty(key, cssVars[key] ? `${cssVars[key]}` : null);
	});
};

export const theme = (node: HTMLElement, cssVars: CSSVarSet) => {
	applyTheme(node, cssVars);

	return {
		update: (newTheme: CSSVarSet) => {
			applyTheme(node, newTheme);
		}
	};
};
