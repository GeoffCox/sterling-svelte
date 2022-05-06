import { darkTheme } from '$lib/Themes/useDarkTheme';
import { lightTheme } from '$lib/Themes/useLightTheme';

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