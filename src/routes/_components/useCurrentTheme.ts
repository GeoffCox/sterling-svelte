import { darkTheme } from '$lib/Themes/useDarkTheme';
import { lightTheme } from '$lib/Themes/useLightTheme';


import { buttonTheme } from '$lib/Buttons/useButtonTheme';
import { primaryButtonTheme } from '$lib/Buttons/usePrimaryButtonTheme';


export const currentTheme = (node: HTMLElement, params: { darkMode: boolean }) => {
    
    if (params.darkMode) {
        darkTheme(node);
    } else {
        lightTheme(node);
    }

    // buttonTheme(node);
    // primaryButtonTheme(node);

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