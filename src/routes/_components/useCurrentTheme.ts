import { darkTheme } from '$lib/themes/useDarkTheme';
import { lightTheme } from '$lib/themes/useLightTheme';

export const currentTheme = (node: HTMLElement, params: { darkMode: boolean }) => {
	if (params.darkMode) {
		darkTheme(node);
	} else {
		lightTheme(node);
	}

	return {
		update(params: { darkMode: boolean }) {
			if (params.darkMode) {
				darkTheme(node);
			} else {
				lightTheme(node);
			}
		}
	};
};
